import React from 'react';
import { Col, Form } from 'react-bootstrap';

const SmallFormField = ({labelName, controlProps}:FieldProps ) => {
    return (
        <>
        <Form.Label column="sm" sm={6}>
            {labelName}
      </Form.Label>
        <Col sm={6}>
            <Form.Control size="sm" {...controlProps} />
        </Col>
        </>
    );
};

type FieldProps = {
    labelName: string
    controlProps: {
        [key: string]: any
    }
}

type SmallFormField = {
    props: FieldProps
}

export default SmallFormField;