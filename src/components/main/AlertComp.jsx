import React from 'react';
import { useState, useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { setAlert } from '@slices';
import { useSelector, useDispatch } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertComp = () => {
    const dispatch = useDispatch();
    const { alert, alertText, success } = useSelector((state) => state.home)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAlert(false));
    };
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default AlertComp