import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate, Route, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  let navigate = useNavigate();

  const { email, name, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('sub');

    if (password !== passwordConfirm) {
      setAlert('Passwords do not match.');
      return;
    }

    register({ name, email, password });

    // Redirect after login
    if (isAuthenticated) {
      navigate('/dashboard');
    }
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
