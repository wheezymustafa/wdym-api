import AnswerCard from './AnswerCard'
import shortid from 'shortid'

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

    static getInstance(name: string, isHost: boolean) {
        let host = new Player(name);
        host._isHost = isHost;
        return host;
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


    
}