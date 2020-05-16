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

    get hostUsername() {
        return this._hostUsername
    }

    set gameSettings(settings: GameSettings) {
        this._gameSettings = settings
    }

    set hostUsername(hostUsername: string) {
        this._hostUsername = hostUsername
    }
}

export class GameSettings {
    password: string
    private _includeNsfwCards: boolean
    private _maxScore: number = 1

    constructor(password: string, includeNsfwCards: boolean, maxScore: number) {
        this.password = password;
        this._includeNsfwCards = includeNsfwCards;
        this._maxScore = maxScore;
    }

    static getInstance() {
        return new GameSettings("", false, 1)
    }

    // get password() {
    //     return this.password
    // }

    get includeNsfwCards() {
        return this._includeNsfwCards
    }

    get maxScore() {
        return this._maxScore
    }
    
    // set password(password: string) {
    //     this._password = password
    // }

    set includeNsfwCards(includeNsfwCards: boolean) {
        this._includeNsfwCards = includeNsfwCards
    }

    set maxScore(maxScore: number) {
        if (maxScore < 1) {
            throw new Error('Max score must be greater than 0.')
        }
    }
}