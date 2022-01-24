import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, name, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('sub');

    if (password !== passwordConfirm) {
      console.error('Passwords do not match.');
      return;
    }

    const newUser = { name, email, password };

    console.log('Success! Submit the following form data => ', formData);
  };

  return (
    <div className='auth-container'>
      <form className='auth-form'>
        <h1>Register</h1>
        <label htmlFor='email'>Email Address</label>
        <input type='text' name='email' value={email} onChange={(e) => onChange(e)} placeholder='Email Address' />
        <label htmlFor='name'>Full Name:</label>
        <input type='text' name='name' value={name} onChange={(e) => onChange(e)} placeholder='Name' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={password} onChange={(e) => onChange(e)} placeholder='Password' />
        <label htmlFor='passwordConfirm'>Confirm Password:</label>
        <input
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={(e) => onChange(e)}
          placeholder='ConfirmPassword'
        />
        <button className='auth-button' onClick={(e) => onSubmit(e)}>
          Register
        </button>
        <hr />
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
