import { bootstrap } from '@/bootstrap';
import React from 'react';
import { useForm } from 'react-hook-form';

const map = {
  china: ['Shanghai', 'Beijing', 'Hongkong'],
  usa: ['New York', 'Washington', 'huston'],
  korea: ['seoul'],
};

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      country: 'china',
      city: 'Shanghai',
    },
  });

  const onSubmit = (values) => {
    console.log('values:', values);
  };

  const onError = (err) => {
    console.log('errors:', err);
  };

  const country = watch('country');

  return (
    <div style={{ padding: 40 }}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset>
          <legend>user profile </legend>
          <label>username:</label>
          <input {...register('username', { required: true })} />
          {errors.username?.type === 'required' && (
            <p style={{ color: 'red' }}>username is required</p>
          )}
          <br />
          <label>password:</label>
          <input {...register('password', { required: true, minLength: 6 })} />
          <br />
          <label>country:</label>
          <select {...register('country', { required: true })}>
            <option value="china">china</option>
            <option value="usa">usa</option>
            <option value="korea">korea</option>
          </select>
          <br />
          <label>city:</label>
          <select {...register('city', { required: true })}>
            {map[country].map((el, idx) => {
              return (
                <option key={idx} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <br />
          <input type="submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default bootstrap(<Form />);
