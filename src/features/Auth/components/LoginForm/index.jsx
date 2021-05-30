import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
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
  progress : {
    position : 'absolute',
    top : theme.spacing(1),
    left : 0,
    right: 0,
  }
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  //them schema validation bat buoc
  const schema = yup.object().shape({
    identifier : yup.string().required('Please enter email').email('Please enter an valid adresse'),
    password : yup.string().required('Please enter password'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema), //validation o day
  });

  const handleSubmit = async (values) => {
    onSubmit && await onSubmit(values);
    //form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      { isSubmitting && <LinearProgress className={classes.progress} /> }
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Identifier" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button disabled={isSubmitting} type="submit" className={classes.submit} variant='contained' color='primary' fullWidth size="large">
          SignIn
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
