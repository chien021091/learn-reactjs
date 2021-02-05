import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  //const hasError = formState.touched[name] && errors[name];
  const hasError = errors[name];
  //touched chi tinh khi da touche vao o input, neu muon luc nao cung hien thi loi thi remove touched

  return (
    <Controller
      //name va control va bat buoc
      name={name}
      control={form.control}
      as={TextField} //tuong ung voi thanh phan nao trong material ui
      //nhung thu ben duoi se tu dong truyen vao ui text field
      margin="normal"
      variant="outlined"
      fullWidth
      label={label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  );
}

export default InputField;
