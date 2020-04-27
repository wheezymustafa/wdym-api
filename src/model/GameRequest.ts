import Player from './Player'

export class GameRequest {
    private _gameSettings: GameSettings
    private _host: Player;

    constructor(gameSettings: GameSettings, host: Player) {
        this._gameSettings = gameSettings;
        this._host = host
    }

    get gameSettings() {
        return this._gameSettings
    }

    get getHost() {
        return this._host
    }    
}

export class GameSettings {
    private _passcode: string;
    private _includeNsfwCards: boolean;
    private _maxScore: number;

    constructor(passcode: string, includeNsfwCards: boolean, maxScore: number) {
        this._passcode = passcode;
        this._includeNsfwCards = includeNsfwCards;
        this._maxScore = maxScore;
    }

    get passcode() {
        return this._passcode
    }

    includeNsfwCards() {
        return this._includeNsfwCards
    }

    get maxScore() {
        return this._maxScore
    }    
}