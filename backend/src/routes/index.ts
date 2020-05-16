import * as express from "express";
import * as gameAssetsService from "../services/GameAssetsService"
import * as gameService from '../services/GameService'
import { GameRequest, GameSettings } from 'src/model/GameRequest';
import Joi from '@hapi/joi'
import { JoinGameResponse, JoinResponseCode } from '../services/GameService';
import logger from '@shared/Logger';
import _ from 'lodash'
import Game from 'src/model/Game';

var router = express.Router();

router.get('/answerCards', function (req, res, next) {
    const includeNsfwCards = req.query.includeNsfwCards == "true"
    gameAssetsService.getAnswerCards(includeNsfwCards)
        .then(result => {
            res.send(result)
        })
})

router.get('/imageCards', function (req, res, next) {
    gameAssetsService.getImageCards()
        .then(result => {
            res.send(result)
        })
})

router.post('/createGame', function (req, res, next) {
    const { body } = req;
    const gameRequestSchema = Joi.object().keys({
        password: Joi.string().required(),
        includeNsfwCards: Joi.bool().required(),
        maxScore: Joi.number().required(),
        hostUsername: Joi.string().required()
    })
    const { error } = gameRequestSchema.validate(body, { presence: 'required' })
    if (error) {
        res.statusCode = 400;
        return res.json(error)
    }
    let gameSettings: GameSettings = new GameSettings(req.body.password, req.body.includeNsfwCards, req.body.maxScore)
    let gameRequest: GameRequest = new GameRequest(gameSettings, req.body.hostUsername)
    console.log(JSON.stringify(gameSettings))
    gameService.createGame(gameRequest)
        .then(result => {
            res.json(result)
        })
})

router.post('/joinGame', function (req, res) {
    const { body } = req;
    const joinRequestSchema = Joi.object().keys({
        password: Joi.string().required(),
        username: Joi.string().required(),
        gameId: Joi.string().required()
    })

    const { error } = joinRequestSchema.validate(body, { presence: 'required' })
    if (error) {
        res.statusCode = 400;
        return res.json(error)
    }

    const getResponse = (err: Error, response: JoinGameResponse) => {
        if (!err) {
            console.log(`resp: ${JSON.stringify(response)}`)
            switch (response.code) {
                case JoinResponseCode.InvalidPassword: {
                    res.statusCode = 401;
                    res.sendStatus(401)
                    break;
                }
                case JoinResponseCode.OK: {
                    res.statusCode = 200;
                    res.json(response)
                    break;
                }
                case JoinResponseCode.InvalidGame: {
                    res.statusCode = 404;
                    res.sendStatus(404)
                    break;
                }
                default: {
                    logger.error(response)
                    res.sendStatus(500)
                    break;
                }
            }

        } else {
            logger.error(`error joining game: ${err}`)
            res.sendStatus(500)
        }

    }
    gameService.joinGame(body, getResponse)
})

router.get('/game/:gameId', function (req, res) {
    const handleGame = (err: Error, game: Game) => {
        if (!err) {
            if (_.isNull(game)) {
                res.sendStatus(404)
            } else {
                res.json(game)
            }
        } else {
            logger.error(err)
            res.sendStatus(500)
        }

    }
    gameService.getGameById(req.params.gameId, handleGame)
})



export default router