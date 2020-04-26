import * as express from "express";
import * as gameAssetsService from "../services/GameAssetsService"

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

export default router