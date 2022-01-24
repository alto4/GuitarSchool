import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, name, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('Login submission triggered.');
    const user = { email, password };

    console.log('Success! Submit the following form data => ', formData);
  };

  return (
    <div className='auth-container'>
      <form className='auth-form'>
        <h1>Login</h1>
        <label htmlFor='email'>Email Address</label>
        <input type='text' name='email' value={email} onChange={(e) => onChange(e)} placeholder='Email Address' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={password} onChange={(e) => onChange(e)} placeholder='Password' />
        <button className='auth-button' onClick={(e) => onSubmit(e)}>
          Login
        </button>
        <hr />
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
