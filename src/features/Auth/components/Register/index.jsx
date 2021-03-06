import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog : PropTypes.func,
};

function Register(props) {
  
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); //lay ket qua ra vi async action se return ve 1 promise

      enqueueSnackbar('Register successfullly', { variant: 'success' });
      const { closeDialog } = props;
      closeDialog && closeDialog();
      console.log('new user', user);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.log('fail to register', error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
