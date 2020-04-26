import Card from '../model/Card'
export default class AnswerCard implements Card {
    id: string;
    private value: string;
    constructor(id: string, value: string) {
        this.id = id;
        this.value = value;
    }
}