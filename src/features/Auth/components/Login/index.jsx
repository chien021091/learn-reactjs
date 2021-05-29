import {unwrapResult} from '@reduxjs/toolkit';
import {useSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../userSlice';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func
};

function Login(props) {

    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction); // lay ket qua ra vi async action se return ve 1 promise

            const {closeDialog} = props;
            closeDialog && closeDialog();
            console.log('new user', user);
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error'});
            console.log('fail to login', error);
        }
    };

    return (<div>
        <LoginForm onSubmit={handleSubmit}/>
    </div>);
}

export default Login;
