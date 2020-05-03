import AnswerCard from './AnswerCard'
import shortid from 'shortid'
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
export default class Player {
    private _id: string;
    private _name: string;
    private _hand: AnswerCard[] = [];
    private _score: number = 0;
    private _isHost: boolean = false;

    constructor(name: string){
        this._id = shortid.generate()
        this._name = name;
    }

    static createHost(name: string) {
        let player = new Player(name);
        player.host = true
        return player;
    }

    public get id(): string {
        return this._id;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get hand(): AnswerCard[] {
        return this._hand;
    }
    public set hand(value: AnswerCard[]) {
        this._hand = value;
    }
    
    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        this._score = value;
    }
    public get host(): boolean {
        return this._isHost
    }
    public set host(isHost: boolean) {
        this._isHost = isHost
    }


    
}