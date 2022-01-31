import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, SET_ALERT } from './types';
import { setAlert } from './alert';

// Get authenticated user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Upsert user profile
export const upsertProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Your profile has successfully been updated.' : 'Your profile has successfully been created.')
      );

      navigate('/dashboard');
    } catch (error) {
      alert('Error!');
      console.log('error data => ', error);
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg)));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status },
      });
    }
  };
