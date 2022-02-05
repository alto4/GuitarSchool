import axios from 'axios';
import { setAlert } from './alert';
import { GET_LESSONS, LESSON_ERROR, UPDATE_ENROLLMENT, CREATE_LESSON, DELETE_LESSON } from './types';

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

    dispatch(setAlert('Enrolled in new lesson'));
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

    dispatch(setAlert('Unenrolled from lesson'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Create a new lesson
export const createLesson = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`api/lessons`, data);
    dispatch({
      type: CREATE_LESSON,
      payload: res.data,
    });

    dispatch(setAlert('Lesson successfully created'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Delete a lesson
export const deleteLesson = (lessonId) => async (dispatch) => {
  try {
    await axios.delete(`api/lessons/${lessonId}`);

    dispatch({
      type: DELETE_LESSON,
      payload: lessonId,
    });

    dispatch(setAlert('Lesson successfully deleted.'));
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
