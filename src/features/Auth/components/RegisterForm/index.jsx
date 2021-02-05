import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

const useStyles = makeStyles(theme => ({
  root : {
    paddingTop : theme.spacing(4),
  },
  avatar : {
    margin : '0 auto',
    backgroundColor : theme.palette.secondary.main
  },
  title : {
    textAlign : 'center',
    margin : theme.spacing(2, 0, 3, 0),
  },
  submit : {
    margin : theme.spacing(3, 0, 2, 0),
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  //them schema validation bat buoc
  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter full Name')
    .test('should has at least two words', "Please enter at least two words", (value) => {
      return value.split(' ').length >= 2;
    }),
    email : yup.string().required('Please enter email').email('Please enter an valid adresse'),
    password : yup.string().required('Please enter password').min(6, 'Please enter at least 6 character'),
    retypePassword : yup.string().required('Please retype password').oneOf([yup.ref('password')], 'Password does not match'),
  });

  const form = useForm({
    defaultValues: {
      title: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema), //validation o day
  });

  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
    form.reset();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button type="submit" className={classes.submit} variant='contained' color='primary' fullWidth>
          Create An Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
