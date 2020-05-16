"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cacheClient = tslib_1.__importStar(require("./CacheClient"));
const gameAssetsService = tslib_1.__importStar(require("./GameAssetsService"));
const Game_1 = tslib_1.__importDefault(require("src/model/Game"));
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
const Player_1 = tslib_1.__importDefault(require("src/model/Player"));
const util_1 = require("util");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
function createGame(gameRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const answerDeck = yield getAnswerDeck(gameRequest.gameSettings.includeNsfwCards);
        const imageDeck = yield getImageDeck();
        const newGame = new Game_1.default(gameRequest.gameSettings, answerDeck, imageDeck);
        const hostPlayer = Player_1.default.createHost(gameRequest.hostName);
        newGame.addPlayer(hostPlayer);
        const id = newGame.id;
        Logger_1.default.info(`Created new game: ${id}`);
        cacheClient.getClient().set(id, JSON.stringify(newGame), "EX", 600, (result) => {
            Logger_1.default.info(`cached ${id}`);
        });
        return { gameId: newGame.id };
    });
}
exports.createGame = createGame;
function getGameById(id, callback) {
    let client = cacheClient.getClient();
    client.get(id, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        if (lodash_1.default.isNull(res)) {
            let game = JSON.parse(res);
            callback(null, game);
        }
        else {
            callback(null, null);
        }
    });
}
exports.getGameById = getGameById;
function joinGame(request, callback) {
    let client = cacheClient.getClient();
    client.get(request.gameId, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        if (!lodash_1.default.isNull(res)) {
            let game = JSON.parse(res);
            if (!game) {
                callback(null, createJoinGameResponse(JoinResponseMessage.InvalidGame, JoinResponseMessage.InvalidGame.valueOf()));
            }
            if (!lodash_1.default.isEqual(request.password, game.gameSettings.password)) {
                callback(null, createJoinGameResponse(JoinResponseMessage.InvalidPassword, JoinResponseMessage.InvalidPassword.valueOf()));
            }
            addPlayerToGame(request.gameId, request.username)
                .then(playerId => {
                callback(createJoinGameResponse(JoinResponseMessage.OK, JoinResponseMessage.OK.valueOf(), playerId));
            }).catch(reject => {
                Logger_1.default.error(reject);
            });
        }
    });
}
exports.joinGame = joinGame;
function addPlayerToGame(id, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const getGame = util_1.promisify(cacheClient.getClient().get);
        const game = JSON.parse(yield getGame(id));
        let newPlayer = new Player_1.default(name);
        game.addPlayer(newPlayer);
        return newPlayer.id;
    });
}
exports.addPlayerToGame = addPlayerToGame;
function getAnswerDeck(includeNsfwCards) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let answerDeck = [];
        yield gameAssetsService.getAnswerCards(includeNsfwCards)
            .then(deck => {
            let shuffled = shuffle(deck);
            answerDeck = shuffled;
        });
        return answerDeck;
    });
}
exports.getAnswerDeck = getAnswerDeck;
function getImageDeck() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let imageDeck = [];
        yield gameAssetsService.getImageCards()
            .then(deck => {
            let shuffled = shuffle(deck);
            imageDeck = shuffled;
        });
        return imageDeck;
    });
}
exports.getImageDeck = getImageDeck;
const shuffle = (deck) => {
    for (var i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[j];
        deck[j] = deck[i];
        deck[i] = temp;
    }
    return deck;
};
class JoinGameRequest {
    constructor(gameId, username, password) {
        this.gameId = gameId;
        this.username = username;
        this.password = password;
    }
}
exports.JoinGameRequest = JoinGameRequest;
var JoinResponseMessage;
(function (JoinResponseMessage) {
    JoinResponseMessage["InvalidGame"] = "Unable to find game";
    JoinResponseMessage["InvalidPassword"] = "Invalid password";
    JoinResponseMessage["OK"] = "OK";
})(JoinResponseMessage = exports.JoinResponseMessage || (exports.JoinResponseMessage = {}));
const createJoinGameResponse = (code, err, playerId) => {
    return {
        code: code,
        err: err,
        playerId: playerId
    };
};
//# sourceMappingURL=GameService.js.map