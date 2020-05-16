"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameRequest {
    constructor(gameSettings, hostUsername) {
        this._gameSettings = gameSettings;
        this._hostUsername = hostUsername;
    }
    get gameSettings() {
        return this._gameSettings;
    }
    get hostName() {
        return this._hostUsername;
    }
}
exports.GameRequest = GameRequest;
class GameSettings {
    constructor(password, includeNsfwCards, maxScore) {
        this._password = password;
        this._includeNsfwCards = includeNsfwCards;
        this._maxScore = maxScore;
    }
    get password() {
        return this._password;
    }
    get includeNsfwCards() {
        return this._includeNsfwCards;
    }
    get maxScore() {
        return this._maxScore;
    }
}
exports.GameSettings = GameSettings;
//# sourceMappingURL=GameRequest.js.map