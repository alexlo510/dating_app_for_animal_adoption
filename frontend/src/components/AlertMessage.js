import React, { useState } from 'react';
import { Snackbar } from '@mui/material/';
import MuiAlert from '@mui/material/Alert';


export default function AlertMessage({message, severity, reset}) {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        reset(false);
        return;
        }

        setOpen(false);
        reset(false);
    };


    return (
        <Snackbar anchorOrigin={{horizontal:"right", vertical:"bottom"}} open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity || ""} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}