import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import SmallFormField from './SmallFormField';

const NewGameForm = (props: NewGameFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    maxScore: 1,
    password: '',
    hostUsername: '',
    includeNsfwCards: false
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(formState);
  }

  const handleChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let value
    if (target.type === 'checkbox') {
      value = target.checked
    } else {
      value = target.value
    }

    let updatedState = {
      ...formState,
      [target.name]: value
    }
    console.log(updatedState)
    setFormState(updatedState)
  }

  return (
    <div>
      <Form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <Form.Group as={Row}>
          <SmallFormField labelName="Max Score:"
            controlProps={{
              type: "number",
              name: "maxScore",
              min: "1",
              max: "10",
              placeholder: "5",
              onChange: handleChanged
            }} />
          <SmallFormField labelName="Game Password:"
            controlProps={{
              type: "text",
              name: "password",
              placeholder: "wdym2020!",
              onChange: handleChanged
            }} />
          <SmallFormField labelName="Your Username:"
            controlProps={{
              type: "text",
              name: "hostUsername",
              placeholder: "coolguy39",
              onChange: handleChanged
            }} />
          <SmallFormField labelName="Include NSFW Cards?"
            controlProps={{
              type: "checkbox",
              name: "includeNsfwCards",
              style: { height: "20px", width: "20px" },
              onChange: handleChanged
            }} />
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 6, offset: 4 }}>
            <Button type="submit" >Start!</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

interface FormState {
  maxScore: number
  password: string
  hostUsername: string
  includeNsfwCards: boolean
}

export type NewGameFormProps = {
  onSubmit: Function
}

export default NewGameForm
