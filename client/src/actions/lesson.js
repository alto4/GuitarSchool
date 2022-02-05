import axios from 'axios';
import { setAlert } from './alert';
import { GET_LESSONS, LESSON_ERROR, UPDATE_ENROLLMENT } from './types';

// Get all lessons
export const getLessons = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/lessons');
    dispatch({
      type: GET_LESSONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Enroll in a lesson
export const enroll = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/lessons/enroll/${lessonId}`);
    dispatch({
      type: UPDATE_ENROLLMENT,
      payload: { lessonId, students: res.data },
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Unenroll from a lesson
export const unenroll = (lessonId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/lessons/unenroll/${lessonId}`);
    dispatch({
      type: UPDATE_ENROLLMENT,
      payload: { lessonId, students: res.data },
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
