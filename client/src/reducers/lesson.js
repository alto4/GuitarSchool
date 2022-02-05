import { GET_LESSONS, LESSON_ERROR, UPDATE_ENROLLMENT, DELETE_LESSON } from '../actions/types';

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: payload,
        loading: false,
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson._id !== payload),
        loading: false,
      };
    case LESSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_ENROLLMENT:
      return {
        ...state,
        lessons: state.lessons.map((lesson) =>
          lesson._id === payload.id ? { ...lesson, students: payload.students } : lesson
        ),
        loading: false,
      };
    default:
      return state;
  }
}
