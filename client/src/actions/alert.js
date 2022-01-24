import { SET_ALERT, REMOVE_ALERT } from './types';
import * as uuid from 'uuid';

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { message, id },
  });

  // Clear alerts after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
