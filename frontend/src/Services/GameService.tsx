import axios from 'axios'

export async function createNewGame(gameRequest: NewGameRequest) {
    let newGame
    try {
        newGame = await (await axios.post('http://localhost:3001/api/createGame', gameRequest)).data
    } catch(err) {
        console.log(err)
    }
    return newGame
}

export class NewGameRequest {
    maxScore: number
    password: string
    hostUsername: string
    includeNsfwCards: boolean
    constructor(maxScore: number, password: string, hostUsername: string, includeNsfwCards: boolean) {
        this.maxScore = maxScore
        this.password = password
        this.hostUsername = hostUsername
        this.includeNsfwCards = includeNsfwCards
    }
}