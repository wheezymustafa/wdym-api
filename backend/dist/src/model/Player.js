"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shortid_1 = tslib_1.__importDefault(require("shortid"));
shortid_1.default.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
class Player {
    constructor(name) {
        this._hand = [];
        this._score = 0;
        this._isHost = false;
        this._id = shortid_1.default.generate();
        this._name = name;
    }
    static createHost(name) {
        let player = new Player(name);
        player.host = true;
        return player;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get hand() {
        return this._hand;
    }
    set hand(value) {
        this._hand = value;
    }
    get score() {
        return this._score;
    }
    set score(value) {
        this._score = value;
    }
    get host() {
        return this._isHost;
    }
    set host(isHost) {
        this._isHost = isHost;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map