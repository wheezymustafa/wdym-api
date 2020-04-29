import Player from './Player'

export class GameRequest {
    private _gameSettings: GameSettings
    private _hostName: string;

    constructor(gameSettings: GameSettings, hostName: string) {
        this._gameSettings = gameSettings;
        this._hostName = hostName
    }

    get gameSettings() {
        return this._gameSettings
    }

    get hostName() {
        return this._hostName
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

    get includeNsfwCards() {
        return this._includeNsfwCards
    }

    get maxScore() {
        return this._maxScore
    }    
}