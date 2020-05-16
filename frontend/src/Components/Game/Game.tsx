import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as ClientSocket from '../../Services/ClientSocket'
const Game = ({ history, location }: RouteComponentProps) => {
    const [socketConnected, setSocketConnected] = useState(false)
    const [gameState, setGameState] = useState<GameState>()
    const [playerState, setPlayerState] = useState<[string]>()

    useEffect(() => {
        console.log('location state effect hit')
        setGameState(location.state as GameState)
        
    }, [location.state])

    useEffect(() => {
        if (gameState && !socketConnected) {
            console.log(`game state: ${JSON.stringify(gameState)}`)
            ClientSocket.connect(gameState)
            ClientSocket.getPlayerEvents((data:any) =>  {
                console.log(data)
            })
            setSocketConnected(true)
            console.log('connected')
        }
    }, [gameState])

    return (
        <div>
            <h4>id: {gameState ? gameState.gameId : ''}</h4>
            <h4>username: {gameState ? gameState.username : ''}</h4>
            <h4>playerId: {gameState ? gameState.playerId : ''}</h4>
        </div>
    );
};

export interface GameState {
    username: string
    playerId: string
    gameId: string
    
}

export default Game;