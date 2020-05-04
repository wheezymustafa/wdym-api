import React from 'react';
import {useParams, withRouter, RouteComponentProps} from 'react-router-dom'
// const socket = io('http://localhost:3111')

// socket.once('connect', () => {
//   console.log('connected')
// })

const Game = ({history, location}: RouteComponentProps) => {
    //const params = JSON.stringify(useParams())
    let val = JSON.stringify(location.state)
    return (
        <div>
            {val}
        </div>
    );
};

export interface GameState {
    id: string
    hostUsername: string
  }

export default Game;