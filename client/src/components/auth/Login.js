import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    login({ email, password });

    // Redirect after login
    if (isAuthenticated) {
      navigate('/dashboard');
    }
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
