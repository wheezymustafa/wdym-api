import Player from './Player';
import { GameSettings } from './GameRequest';
import ImageCard from './ImageCard';
import AnswerCard from './AnswerCard';
import shortid from 'shortid'
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
export default class Game {
    private _id: string;
    private _players: Player[] = []
    settings: GameSettings;
    private _answerDeck: AnswerCard[] = []
    private _imageDeck: ImageCard[] = []
    constructor(gameSettings: GameSettings, answerDeck: AnswerCard[], imageDeck: ImageCard[]) {
        this._id = shortid.generate();
        this.settings = gameSettings;
        this._answerDeck = answerDeck;
        this._imageDeck = imageDeck;
    }

    static getInstance() {
        return new Game(GameSettings.getInstance(), [], [])
    }

    get id() {
        return this._id;
    }

    addPlayer(player: Player) {
        this._players.push(player)
    }

    removePlayer(id: string) {
        let index = this._players.findIndex(player => player.id === id)
        this._players.splice(index)
    }

    get players() {
        return this._players;
    }

    // get settings(): GameSettings {
    //     return this._settings;
    // }

    get answerDeck() {
        return this._answerDeck
    }

    get answerCard() {
        if (this._answerDeck.length > 0) {
            return this._answerDeck.pop()
        }
    }

    get imageCard() {
        if (this._imageDeck.length > 0) {
            return this._imageDeck.pop()
        }
    }

}