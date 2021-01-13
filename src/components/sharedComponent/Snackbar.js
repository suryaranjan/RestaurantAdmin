import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './sharedComponent.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = (props) => {
    const classes = useStyles();
    const horizon = {
        vertical: 'top',
        horizontal: 'center'
    }
    return (
        <div className={`${classes.root} snackBar`}>
            <Snackbar open={props.snackbar.open} autoHideDuration={5000} anchorOrigin={horizon} onClose={() => props.handleShowNotification(true)}>
                <Alert onClose={() => props.handleShowNotification(true)} severity={`${props.snackbar.type}`}>
                    {props.snackbar.message}
                </Alert>
            </Snackbar>
        </div>)
}

export default SnackbarAlert;