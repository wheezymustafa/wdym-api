import * as http from 'http'
import socketIo = require('socket.io')
import Logger from '@shared/Logger'
import _ from 'lodash'
export default function (listener: http.RequestListener) {
    let server: http.Server
    let io: socketIo.Server

    server = http.createServer(listener)
    server.listen(3111, () => {
        console.log("ok im listening on 3111")
    })
    io = socketIo(server)

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('someone disconnected')
        })

        socket.on('newPlayer', (data: PlayerData) => {
            console.log(`newPlayer event: ${data}`)
            if (!_.isNull(data.gameId)) {
                socket.join(data.gameId, (err) => {
                    if (err) {
                        Logger.error(`Err joining room: ${data.gameId}: ${err}`)
                    }
                    socket.to(data.gameId).emit('newPlayer', `${data.username} has joined!`)
                })
            }
        })
    })
}

export interface PlayerData {
    username: string
    playerId: string
    gameId: string
}