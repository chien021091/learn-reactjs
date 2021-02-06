import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);//lay ket qua ra vi async action se return ve 1 promise

      console.log('new user', user);
    } catch (error) {
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
