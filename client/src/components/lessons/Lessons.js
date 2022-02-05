import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import LessonCard from './LessonCard';
import LessonForm from './LessonForm';
import { getLessons } from '../../actions/lesson';

const Lessons = ({ getLessons, lesson: { lessons, loading }, auth: { isAuthenticated }, profile: { profile } }) => {
  useEffect(() => {
    getLessons();
  }, [getLessons]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <h1>Lessons Homepage</h1>
      <p>Check out our collection of lessons below</p>
      {isAuthenticated && profile?.type === 'Instructor' && <LessonForm />}

      <div className='lessons-container' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {lessons.map((lesson) => (
          // <p>{JSON.stringify(lesson)}</p>
          <LessonCard id={lessons._id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

Lessons.propTypes = {
  getLessons: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getLessons })(Lessons);
