"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const gameAssetsService = tslib_1.__importStar(require("../services/GameAssetsService"));
const gameService = tslib_1.__importStar(require("../services/GameService"));
const GameRequest_1 = require("src/model/GameRequest");
const joi_1 = tslib_1.__importDefault(require("@hapi/joi"));
const GameService_1 = require("../services/GameService");
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
var router = express.Router();
router.get('/answerCards', function (req, res, next) {
    const includeNsfwCards = req.query.includeNsfwCards == "true";
    gameAssetsService.getAnswerCards(includeNsfwCards)
        .then(result => {
        res.send(result);
    });
});
router.get('/imageCards', function (req, res, next) {
    gameAssetsService.getImageCards()
        .then(result => {
        res.send(result);
    });
});
router.post('/createGame', function (req, res, next) {
    const { body } = req;
    const gameRequestSchema = joi_1.default.object().keys({
        password: joi_1.default.string().required(),
        includeNsfwCards: joi_1.default.bool().required(),
        maxScore: joi_1.default.number().required(),
        hostUsername: joi_1.default.string().required()
    });
    const { error } = gameRequestSchema.validate(body, { presence: 'required' });
    if (error) {
        res.statusCode = 400;
        return res.json(error);
    }
    let gameSettings = new GameRequest_1.GameSettings(req.body.password, req.body.includeNsfwCards, req.body.maxScore);
    let gameRequest = new GameRequest_1.GameRequest(gameSettings, req.body.hostUsername);
    gameService.createGame(gameRequest)
        .then(result => {
        res.json(result);
    });
});
router.post('/joinGame', function (req, res, next) {
    const { body } = req;
    const joinRequestSchema = joi_1.default.object().keys({
        password: joi_1.default.string().required(),
        username: joi_1.default.string().required(),
        gameId: joi_1.default.string().required()
    });
    const { error } = joinRequestSchema.validate(body, { presence: 'required' });
    if (error) {
        res.statusCode = 400;
        return res.json(error);
    }
    const getResponse = (err, response) => {
        if (!err) {
            switch (response.code) {
                case GameService_1.JoinResponseMessage.InvalidGame: {
                    res.statusCode = 404;
                    break;
                }
                case GameService_1.JoinResponseMessage.InvalidPassword: {
                    res.statusCode = 401;
                    break;
                }
                case GameService_1.JoinResponseMessage.OK:
                    {
                        res.statusCode = 200;
                    }
                    console.log(JSON.stringify(response));
                    return res.json(response);
            }
        }
        else {
            Logger_1.default.error(err);
            res.status(500);
        }
    };
    gameService.joinGame(body, getResponse);
});
router.get('/game/:gameId', function (req, res) {
    const handleGame = (err, game) => {
        if (!err) {
            if (lodash_1.default.isNull(game)) {
                res.status(404);
            }
            else {
                res.json(game);
            }
        }
        else {
            Logger_1.default.error(err);
            res.status(500);
        }
    };
    gameService.getGameById(req.params.gameId, handleGame);
});
exports.default = router;
//# sourceMappingURL=index.js.map