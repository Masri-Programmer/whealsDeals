import React from 'react';
import { Form } from 'react-bootstrap';
import Input from '@mui/material/Input';

const DisabledForm = ({ value, txt }) => {
    return (
        <Form.Group className="mb-3">
            {value}
            <Form.Label className={`text-medium mojo-text w-100`}>
                <Form.Control type="text" value={txt} disabled />
            </Form.Label>
        </Form.Group>
        // <Form.Control type="text" value={value} disabled />
    );
};

export default DisabledForm;
