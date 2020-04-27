import * as cacheClient from './CacheClient'
import { GameRequest } from 'src/model/GameRequest';
import AnswerCard from 'src/model/AnswerCard';

export function createGame(gameRequest: GameRequest) {
    //creates game and adds to cache

}

export function setCacheTest() {
    let value: string = JSON.stringify(new AnswerCard("12345","test"))
    console.log(value)
    cacheClient.getCacheClient().set("test", value,"EX",60)
}

export function getCacheTest(callback: Function) {
    let response: string = ""
    cacheClient.getCacheClient().get("test", function(err, res) {
        console.log("res" + res)
        callback(res)
    })
    return Promise.resolve(response)
}