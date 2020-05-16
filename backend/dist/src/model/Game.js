"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shortid_1 = tslib_1.__importDefault(require("shortid"));
shortid_1.default.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
class Game {
    constructor(gameSettings, answerDeck, imageDeck) {
        this._players = [];
        this._answerDeck = [];
        this._imageDeck = [];
        this._id = shortid_1.default.generate();
        this._settings = gameSettings;
        this._answerDeck = answerDeck;
        this._imageDeck = imageDeck;
    }
    get id() {
        return this._id;
    }
    addPlayer(player) {
        this._players.push(player);
    }
    removePlayer(id) {
        let index = this._players.findIndex(player => player.id === id);
        this._players.splice(index);
    }
    get players() {
        return this._players;
    }
    get gameSettings() {
        return this._settings;
    }
    get answerDeck() {
        return this._answerDeck;
    }
    get answerCard() {
        if (this._answerDeck.length > 0) {
            return this._answerDeck.pop();
        }
    }
    get imageCard() {
        if (this._imageDeck.length > 0) {
            return this._imageDeck.pop();
        }
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map