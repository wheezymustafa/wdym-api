import * as express from "express";
import * as gameAssetsService from "../services/GameAssetsService"
import * as gameService from '../services/GameService'
import { GameRequest, GameSettings } from 'src/model/GameRequest';
import Joi from '@hapi/joi'

var router = express.Router();

router.get('/', function (req, res, next) {
    res.send("MADE IT")
})

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
    const {body} = req;
    const gameRequestSchema = Joi.object().keys({
        passcode: Joi.string().required(),
        includeNsfwCards: Joi.bool().required(),
        maxScore: Joi.number().required(),
        hostName: Joi.string().required()
    })
    const {error, value} = gameRequestSchema.validate(body, {presence: 'required'})
    if (error){
        res.statusCode = 400;
        res.json(error)
    }
    let gameSettings : GameSettings = new GameSettings(req.body.passcode, req.body.includeNsfwCards, req.body.maxScore)
    let gameRequest: GameRequest = new GameRequest(gameSettings, req.body.hostName)
    gameService.createGame(gameRequest)
})


export default router