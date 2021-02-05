import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const { onSubmit } = props;

  //them schema validation bat buoc
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title')
        .min(5, 'Title is short'),
  });

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),//validation o day
  });

  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      This is Todo Form
      <InputField name="title" label="Todo" form={form} />
    </form>
  );
}

export default TodoForm;
