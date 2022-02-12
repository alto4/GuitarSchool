import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { enroll, unenroll, deleteLesson } from '../../actions/lesson';
import placeholder from '../../assets/course_placeholder.jpg';

const LessonCard = ({
  enroll,
  unenroll,
  deleteLesson,
  auth,
  lesson,
  lesson: { _id, user, title, description, url, level, createdOn, students },
}) => {
  useEffect(() => {}, [lesson]);

  return (
    <div className='lesson-card'>
      <div className='title'>
        <h2>
          {title} ({level})
        </h2>
        {!auth.loading && user === auth?.payload?.user?.id && (
          <button onClick={(e) => deleteLesson(_id)} className='btn-secondary'>
            <i className='fa fa-trash'></i>
          </button>
        )}
      </div>
      <div className='body'>
        <img src={placeholder} alt={title} />
        <div>
          <span>
            Added on <Moment format='YYYY-MM-DD'>{createdOn}</Moment> by {user}
          </span>
          <p>{description}</p>
          {students.length > 0 && (
            <p>
              {students.length} student{students.length > 1 && 's'} enrolled.
            </p>
          )}{' '}
        </div>
      </div>
      <div className='button-container'>
        <Link to={`/lessons/${_id}`}>
          <button className='auth-button'>View Lesson</button>
        </Link>

        <button onClick={(e) => enroll(_id)} className='btn-secondary'>
          Enroll
        </button>
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  enroll: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { enroll, unenroll, deleteLesson })(LessonCard);
