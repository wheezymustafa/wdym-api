import { Modal, Button } from 'react-bootstrap'
import React, { Props, useState } from 'react';
import NewGameForm, { NewGameFormProps } from './NewGameForm';

const NewGameFormModal = (props: CombinedNewGameProps) => {
    return (
        <div>
            <Modal
                {...props.modalProps}
                size="sm"
                centered>
                <Modal.Header closeButton><strong>New Game</strong></Modal.Header>
                    <Modal.Body>
                        <NewGameForm onSubmit={props.newGameFormProps.onSubmit}/>
                    </Modal.Body>
            </Modal>
        </div>
    );
};

type CombinedNewGameProps = {
    modalProps: ModalProps
    newGameFormProps: NewGameFormProps
}

type ModalProps = {
    show: boolean
    onHide: () => void
}

export default NewGameFormModal;