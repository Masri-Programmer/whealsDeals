import React from 'react'
import { Form } from 'react-bootstrap';

const FormGroup = ({ labelClass, label, placeholder, type, ref, autoComplete, onChange, value }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label className={`text-medium w-100 ${labelClass}`}>
                {label}
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    id={label}
                    ref={ref}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    value={value}
                />
            </Form.Label>
        </Form.Group>
    )
}

export default FormGroup