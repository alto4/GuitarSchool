import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getLesson } from '../../actions/lesson';
import Moment from 'react-moment';
import { enroll, unenroll, deleteLesson } from '../../actions/lesson';

const Lesson = (props) => {
  const [lessonDetails, setLessonDetails] = useState({
    title: '',
    level: '',
    description: '',
    url: '',
    createdOn: '',
    students: [],
  });

  const { id } = useParams();

  useEffect(() => {
    props.getLesson(id);
  }, []);

  useEffect(() => {
    if (props.lesson.lesson) {
      setLessonDetails(props.lesson.lesson);
    }
  }, [props]);

  return props.lesson.loading ? (
    <Spinner />
  ) : (
    <div style={{ maxWidth: '550px', margin: 'auto' }}>
      <h1>Lesson</h1>
      <h2>
        {lessonDetails.level}: {lessonDetails.title}
      </h2>
      <span>
        Added on <Moment format='YYYY-MM-DD'>{lessonDetails?.createdOn}</Moment> by {lessonDetails?.user}
      </span>

      <p>{lessonDetails?.description}</p>
      {lessonDetails?.students.length > 0 && (
        <p>
          {lessonDetails?.students.length} student{lessonDetails?.students.length > 1 && 's'} enrolled.
        </p>
      )}
      <button onClick={(e) => props.enroll(id)} className='auth-button'>
        Enroll
      </button>
      {lessonDetails?.user === props.auth?.payload?.user?.id && (
        <button onClick={(e) => deleteLesson(id)} className='auth-button'>
          Delete Lesson
        </button>
      )}
    </div>
  );
};

Lesson.propTypes = {
  getLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  enroll: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLesson, enroll, unenroll, deleteLesson })(Lesson);
