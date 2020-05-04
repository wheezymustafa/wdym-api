import React, { Props, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Button, ButtonGroup } from 'react-bootstrap'
import styles from './Menu.module.css'
import NewGameFormModal from '../NewGameForm/NewGameFormModal';
import { NewGameRequest, createNewGame } from '../../Services/GameService';
import { GameState } from '../Game/Game';
const Start = (props:any) => {
    const [showFormState, setShowFormState] = useState(false)
    const [gameState, setGameState] = useState<GameState>()
    let history = useHistory()
    const handleCreateNewGame = ({ maxScore, hostUsername, password, includeNsfwCards }: NewGameRequest) => {
        const request = new NewGameRequest(maxScore, password, hostUsername, includeNsfwCards)
        createNewGame(request)
            .then(resolve => {
                let response: GameState = {
                    id: resolve.gameId,
                    hostUsername: hostUsername
                }
                setGameState(response)
                history.push(`/game/${response.id}`, response)
            })
    }

    return (
        <>
            <div className={styles.buttonGroup}>
                <ButtonGroup vertical>
                    <Button variant="success"
                        onClick={() => setShowFormState(true)}>Create New Game</Button>
                    <Button variant="primary">Join Game</Button>
                </ButtonGroup>
            </div>
            <NewGameFormModal modalProps={{ show: showFormState, onHide: () => setShowFormState(false) }}
                newGameFormProps={{ onSubmit: handleCreateNewGame }} />
        </>
    );
};

export default Start;