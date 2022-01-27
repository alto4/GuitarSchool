import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';

// Authenticate existing user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    console.log('Token still here', localStorage.token);
    setAuthToken(localStorage.token);
  }

  try {
    const res = axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register new user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());

      let navigate = useNavigate();
      // Redirect after login
      return <Navigate to='/dashboard' />;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg)));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
