import axios from 'axios'

export async function createNewGame(gameRequest: NewGameRequest) {
    let newGame
    try {
        newGame = await (await axios.post('http://localhost:3001/api/createGame', gameRequest)).data
    } catch (err) {
        console.log(err)
    }
    return newGame
}

export async function joinGame(joinRequest: JoinGameRequest) {
    let result:JoinGameResponse|undefined = undefined
    let joinResponse = await axios.post('http://localhost:3001/api/joinGame', joinRequest)
        .catch(reject => {
            switch (reject.response.status) {
                case 400: result = createJoinGameResponse(undefined, "Game not found!"); break;
                case 401: result = createJoinGameResponse(undefined, "Invalid password!"); break;
                default:  result = createJoinGameResponse(undefined, "Something went wrong!"); break;
            }
        })

        if (joinResponse) {
            result = createJoinGameResponse(joinResponse.data.playerId, undefined)
        }

        return result
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

export class JoinGameRequest {
    gameId: string
    username: string
    password: string
    constructor(gameId: string, username: string, password: string) {
        this.gameId = gameId
        this.username = username
        this.password = password
    }
}

const createJoinGameResponse = (playerId?: string, err?: string) => {
    return {
        playerId: playerId,
        err: err
    } as JoinGameResponse
}

export interface JoinGameResponse {
    playerId: string
    err?: string
}

export interface NewGameResponse {
    gameId: string,
    playerId: string
}