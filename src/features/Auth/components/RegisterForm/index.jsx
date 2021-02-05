import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const { onSubmit } = props;

  //them schema validation bat buoc
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title').min(5, 'Title is short'),
  });

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema), //validation o day
  });

  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
    form.reset();
  };

  return (
    <div>
        <Avatar>
            <LockOutlined />
        </Avatar>
        <Typography component="h3" variant="h5">
            Create An Account
        </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="title" label="Todo" form={form} />
      </form>
    </div>
  );
}

export default RegisterForm;
