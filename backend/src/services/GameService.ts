import * as cacheClient from './CacheClient'
import { GameRequest } from 'src/model/GameRequest';
import * as gameAssetsService from './GameAssetsService'
import AnswerCard from 'src/model/AnswerCard';
import ImageCard from 'src/model/ImageCard';
import Game from 'src/model/Game';
import logger from '@shared/Logger';
import Player from 'src/model/Player';
import {promisify} from 'util'

export async function createGame(gameRequest: GameRequest) {
    //creates game and adds to cache
    const answerDeck = await getAnswerDeck(gameRequest.gameSettings.includeNsfwCards)
    const imageDeck = await getImageDeck()
    const newGame = new Game(gameRequest.gameSettings, answerDeck, imageDeck)
    const hostPlayer = Player.createHost(gameRequest.hostName)
    newGame.addPlayer(hostPlayer)
    const id = newGame.id

    logger.info(`Created new game: ${id}`)

    cacheClient.getClient().set(id, JSON.stringify(newGame),"EX",60, (result) =>{
        logger.info(`cached ${id}`)
    })
    return {gameId: newGame.id}
}

export async function addPlayerToGame(id: string, name: string) {
    const getGame = promisify(cacheClient.getClient().get)
    const game: Game = JSON.parse(await getGame(id))
    game.addPlayer(new Player(name))
}

async function getAnswerDeck(includeNsfwCards: boolean) {
    let answerDeck: AnswerCard[] = []
    await gameAssetsService.getAnswerCards(includeNsfwCards)
        .then(deck => {
            let shuffled = shuffle(deck)
            answerDeck = shuffled
        })
    return answerDeck
}

async function getImageDeck() {
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