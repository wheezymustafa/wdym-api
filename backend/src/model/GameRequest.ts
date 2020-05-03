import Player from './Player'

export class GameRequest {
    private _gameSettings: GameSettings
    private _hostUsername: string;

    constructor(gameSettings: GameSettings, hostUsername: string) {
        this._gameSettings = gameSettings;
        this._hostUsername = hostUsername
    }

    get gameSettings() {
        return this._gameSettings
    }

    get hostName() {
        return this._hostUsername
    }    
}

export class GameSettings {
    private _password: string;
    private _includeNsfwCards: boolean;
    private _maxScore: number;

    constructor(password: string, includeNsfwCards: boolean, maxScore: number) {
        this._password = password;
        this._includeNsfwCards = includeNsfwCards;
        this._maxScore = maxScore;
    }

    get password() {
        return this._password
    }

    get includeNsfwCards() {
        return this._includeNsfwCards
    }

    get maxScore() {
        return this._maxScore
    }    
}