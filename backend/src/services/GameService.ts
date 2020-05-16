import * as cacheClient from './CacheClient'
import { GameRequest, GameSettings } from 'src/model/GameRequest';
import * as gameAssetsService from './GameAssetsService'
import AnswerCard from 'src/model/AnswerCard';
import ImageCard from 'src/model/ImageCard';
import Game from 'src/model/Game';
import logger from '@shared/Logger';
import Player from 'src/model/Player';
import { promisify } from 'util'
import _ from 'lodash'
import { Callback } from 'redis';
import { Err } from '@hapi/joi';

export async function createGame(gameRequest: GameRequest) {
    //creates game and adds to cache
    const answerDeck = await getAnswerDeck(gameRequest.gameSettings.includeNsfwCards)
    const imageDeck = await getImageDeck()
    const newGame = new Game(gameRequest.gameSettings, answerDeck, imageDeck)
    const hostPlayer = Player.createHost(gameRequest.hostUsername)
    newGame.addPlayer(hostPlayer)
    const id = newGame.id

    logger.info(`Created new game: ${id}`)

    cacheClient.getClient().set(id, JSON.stringify(newGame), "EX", 600, (result) => {
        logger.info(`cached ${id}`)
    })
    return { gameId: newGame.id, playerId: hostPlayer.id }
}

function updateGameCache(game: Game) {
    let client = cacheClient.getClient()
    client.set(game.id, JSON.stringify(game), "EX", 600, (result) => {
        logger.info(`cached ${game.id}`)
    })
}

export function getGameById(id: string, callback: Function) {
    let client = cacheClient.getClient()
    client.get(id, (err, res) => {
        if (err) {
            return callback(err, null)
        }
        if (!_.isNull(res)) {
            let game: Game = JSON.parse(res)
            callback(null, game)
        } else {
            callback(null, null)
        }
    })
}

export function joinGame(request: JoinGameRequest, callback: Function) {

    getGameById(request.gameId, (err: Error, result: Game) => {
        if (err) {
            return callback(err, null)
        }
        if (_.isNull(result)) {
            console.log(`gameId not found: ${request.gameId}`)
            callback(null, createJoinGameResponse(JoinResponseCode.InvalidGame, 'Unable to find game'))
        } else {
            let game:Game = Object.assign(Game.getInstance(), result as Game)
            console.log(game)
            if (!_.isEqual(request.password, game.settings.password)) {
                callback(null, createJoinGameResponse(JoinResponseCode.InvalidPassword, 'Invalid password'))
            } else {
                addPlayerToGame(game, request.username)
                    .then(playerId => {
                        callback(null, createJoinGameResponse(JoinResponseCode.OK, undefined, playerId))
                    }).catch(reject => {
                        logger.error(reject)
                        callback(reject, null)
                    })
            }
        }
    })
}

export async function addPlayerToGame(game: Game, name: string) {
    let newPlayer = new Player(name)
    game.addPlayer(newPlayer)
    updateGameCache(game)
    return newPlayer.id
}

export async function getAnswerDeck(includeNsfwCards: boolean) {
    let answerDeck: AnswerCard[] = []
    await gameAssetsService.getAnswerCards(includeNsfwCards)
        .then(deck => {
            let shuffled = shuffle(deck)
            answerDeck = shuffled
        })
    return answerDeck
}

export async function getImageDeck() {
    let imageDeck: ImageCard[] = []
    await gameAssetsService.getImageCards()
        .then(deck => {
            let shuffled = shuffle(deck)
            imageDeck = shuffled
        })
    return imageDeck
}

const shuffle = (deck: any[]) => {
    for (var i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[j]
        deck[j] = deck[i]
        deck[i] = temp
    }
    return deck
}

export class JoinGameRequest {
    username: string
    password: string
    gameId: string
    constructor(gameId: string, username: string, password: string) {
        this.gameId = gameId
        this.username = username
        this.password = password
    }
}

export interface JoinGameResponse {
    playerId: string | undefined
    err?: string
    code: JoinResponseCode
}

export enum JoinResponseCode {
    InvalidGame = 404,
    InvalidPassword = 401,
    OK = 200
}

const createJoinGameResponse = (code: JoinResponseCode, err?: string, playerId?: string): JoinGameResponse => {
    return {
        code: code,
        err: err,
        playerId: playerId
    }


}