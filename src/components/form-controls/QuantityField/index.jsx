import { Box, FormHelperText, IconButton, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline, SettingsOverscanOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  box : {
    display : 'flex',
    flexFrow : 'row nowrap',
    alignItems : 'center',
    maxWidth : '200px',
  }
}));

function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { formState: { errors }, setValue } = form;
  const hasError = !!errors[name];

  const classes = useStyles();

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <Typography>{label}</Typography>
      
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box className={classes.box}>
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput 
              id={name}
              type="number"
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
          
        )}
      />

      <FormHelperText error={hasError} id="component-helper-text">{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
