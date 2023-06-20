import React, { useState, useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const SearchInput = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const handleChange = useCallback((e) => {
        setSearchValue(e.target.value);
        onSubmit(e.target.value);
    }, [onSubmit]);

    return (
        <div>
            <Form className="d-flex w-100">
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    value={searchValue}
                    placeholder="Enter your search key..."
                    className="me-2"
                    aria-label="Search"
                    autoFocus
                />
            </Form>
        </div>
    )
}
export default SearchInput
