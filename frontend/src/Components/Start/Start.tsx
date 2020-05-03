import React, { Props, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap'
import styles from './Start.module.css'
import NewGameFormModal from '../NewGameForm/NewGameFormModal';
import { createNewGame, NewGameRequest } from '../../Services/GameService'
const Start = () => {
    const [showFormState, setShowFormState] = useState(false)

    const handleCreateNewGame = ({maxScore, hostUsername, password, includeNsfwCards}: NewGameRequest) => {
        const request = new NewGameRequest(maxScore, password, hostUsername, includeNsfwCards)
        createNewGame(request)
            .then(resolve => {
                console.log(resolve)
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