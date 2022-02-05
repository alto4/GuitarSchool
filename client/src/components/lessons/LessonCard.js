import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { enroll, unenroll, deleteLesson } from '../../actions/lesson';

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
    <div style={{ maxWidth: '350px' }}>
      <h2>
        {level}: {title}
      </h2>
      <span>
        Added on <Moment format='YYYY-MM-DD'>{createdOn}</Moment> by {user}
      </span>

      <p>{description}</p>
      {students.length > 0 && (
        <p>
          {students.length} student {students.length > 1 && 's'} enrolled.
        </p>
      )}
      <Link to={`/lesson/${_id}`}>
        <button className='auth-button'>View Lesson</button>
      </Link>
      <button onClick={(e) => enroll(_id)} className='auth-button'>
        Enroll
      </button>
      {!auth.loading && user === auth.payload.user.id && (
        <button onClick={(e) => deleteLesson(_id)} className='auth-button'>
          Delete Lesson
        </button>
      )}
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
