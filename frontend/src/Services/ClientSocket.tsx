import io from 'socket.io-client'
import { GameState } from '../Components/Game/Game'
const uri = "http://localhost:3111"
var socket: SocketIOClient.Socket = io(uri)
export function connect(playerData: GameState) {
    socket.once('connect', () => {
        console.log(`connected to ${uri}`)
    })
    console.log(`emitting ${JSON.stringify(playerData)}`)
    socket.emit('newPlayer', playerData)
}

export function getSocket() {
    return socket
}

export function getPlayerEvents(callback: Function) {
    socket.on('newPlayer', (data: any) => {
        console.log('event received')
        callback(data)
    })
}