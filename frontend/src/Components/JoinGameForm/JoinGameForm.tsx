import React, { useState, FormEvent, ChangeEvent } from 'react';
import SmallFormField from '../Form/SmallFormField';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';

const JoinGameForm = (props: JoinFormProps) => {
    const [joinForm, setJoinForm] = useState<JoinFormState>({
        gameId: '',
        password: '',
        username: ''
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(joinForm);
    }

    const handleChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
        let value
        if (target.type === 'checkbox') {
            value = target.checked
        } else {
            value = target.value
        }

        let updatedState = {
            ...joinForm,
            [target.name]: value
        }
        console.log(updatedState)
        setJoinForm(updatedState)
    }

    return (
        <div>
            <Form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                <Form.Group as={Row}>
                    <SmallFormField
                        labelName="Game ID:"
                        controlProps={{
                            type: "text",
                            name: "gameId",
                            required: true,
                            onChange: handleChanged
                        }} />
                    <SmallFormField
                        labelName="Password:"
                        controlProps={{
                            type: "text",
                            name: "password",
                            required: true,
                            onChange: handleChanged
                        }} />
                    <SmallFormField
                        labelName="Username:"
                        controlProps={{
                            type: "text",
                            name: "username",
                            required: true,
                            onChange: handleChanged
                        }} />
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{ span: 6, offset: 4 }}>
                        <Button type="submit" >Join!</Button>
                    </Col>
                </Form.Group>
                <Alert show={props.alert.show} variant='danger'><p style={{textAlign: "center"}}>{props.alert.message}</p></Alert>
            </Form>
        </div>
    );
};

export interface JoinFormState {
    gameId: string,
    password: string,
    username: string
}

export interface JoinFormProps {
    onSubmit: Function,
    alert: {
        show: boolean,
        message: string
    }
}

export default JoinGameForm;