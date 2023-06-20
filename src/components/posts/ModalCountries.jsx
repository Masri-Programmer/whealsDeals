import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Form from 'react-bootstrap/Form';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../../utils/store/slices/PostsSlice';

export default function ModalCountries(props) {
    const dispatch = useDispatch();
    const { onClose, selectedValue, open, AllCountries } = props;
    const { countries } = useSelector((state) => state.posts)


    const handleClose = () => {
        onClose(selectedValue);
    };


    const handleChange = (e, id) => {
        if (e.target.checked) {
            dispatch(setCountries([...countries, id]))
        } else {
            dispatch(setCountries(countries?.filter(Id => Id !== id)))
        }
    };

    const isChecked = (id) => {
        return countries.includes(id);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle><span className='text-heavy-metal text-heavy-font text-black text-uppercase'>
                Specific Country
            </span>
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {AllCountries?.map(({ name, id }) => (
                    <label key={id} htmlFor={`option-${id}`} className={`text-regular p-2 rounded d-flex bg-white`}
                    >
                        <div className="flex-grow-1 text-regular text-capitalize mx-3">{name}</div>
                        <Form.Check
                            type="checkbox"
                            id={`option-${id}`}
                            value={id}
                            className="checkbox mx-2"
                            checked={isChecked(id)}
                            onChange={(e) => { handleChange(e, id) }}
                        />
                    </label>
                    // <ListItem disableGutters key={id}>
                    //     <Form.Check
                    //         className="mx-2 checkboxes"
                    //         type="checkbox"
                    //         id={id}
                    //         label={
                    //             <>
                    //                 <div className="text-regular text-capitalize">
                    //                     {name}
                    //                 </div>
                    //             </>
                    //         }
                    //         checked={isChecked(id)}
                    //         onChange={(e) => { handleChange(e, id) }}
                    //     />
                    // </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

ModalCountries.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};