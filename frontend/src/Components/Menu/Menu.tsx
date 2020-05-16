import React, { useState } from 'react';
import { Alert, Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as gameService from '../../Services/GameService';
import { JoinGameRequest, NewGameRequest } from '../../Services/GameService';
import { GameState } from '../Game/Game';
import withSmallModal from '../HOC/Modal/SmallModal';
import JoinGameForm, { JoinFormState } from '../JoinGameForm/JoinGameForm';
import NewGameForm from '../NewGameForm/NewGameForm';
import styles from './Menu.module.css';
import _ from 'lodash'
const Start = (props: any) => {
    const [showNewForm, setShowNewForm] = useState(false)
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [gameState, setGameState] = useState<GameState>()
    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })
    let history = useHistory()

    const joinGame = (gameInfo: GameState) => {
        setGameState(gameInfo)
        history.push(`/game/${gameInfo.gameId}`, gameInfo)
    }

    const handleCreateNewGame = ({ maxScore, hostUsername, password, includeNsfwCards }: NewGameRequest) => {
        const request = new NewGameRequest(maxScore, password, hostUsername, includeNsfwCards)
        gameService.createNewGame(request)
            .then(resolve => {
                let response: GameState = {
                    gameId: resolve.gameId,
                    playerId: resolve.playerId,
                    username: hostUsername
                }
                joinGame(response)
            })
    }

    const handleJoinGame = ({ gameId, username, password }: JoinFormState) => {
        let request = new JoinGameRequest(gameId, username, password)
        gameService.joinGame(request)
            .then(response => {
                if (!_.isUndefined(response)) {
                    if (response.err) {
                        console.log('setting alert')
                        setAlert({ show: true, message: response.err })
                    } else {
                        let joinInfo:GameState = {
                            gameId: gameId,
                            username: username,
                            playerId: response.playerId
                        }
                        joinGame(joinInfo)
                    }
                }
            }).catch(reject => {
                console.log(reject)
            })
    }
    const NewFormWithModal = withSmallModal(() => <NewGameForm onSubmit={handleCreateNewGame} />)
    const JoinFormWithModal = withSmallModal(() => <JoinGameForm onSubmit={handleJoinGame}
        alert={{ show: alert.show, message: alert.message }} />)
    return (
        <>
            <div className={styles.buttonGroup}>
                <ButtonGroup vertical>
                    <Button variant="success"
                        onClick={() => setShowNewForm(true)}>Create New Game</Button>
                    <Button variant="primary"
                        onClick={() => setShowJoinForm(true)}>Join Game</Button>
                </ButtonGroup>
            </div>
            <NewFormWithModal onHide={() => setShowNewForm(false)} show={showNewForm} label="New Game" />
            <JoinFormWithModal onHide={() => setShowJoinForm(false)} show={showJoinForm} label="Join Game" />
        </>
    );
};

export default Start;