import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { enroll, unenroll } from '../../actions/lesson';

const LessonCard = ({
  enroll,
  unenroll,
  auth,
  lesson: { _id, user, title, description, url, level, createdOn, students },
}) => {
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
    </div>
  );
};

LessonCard.propTypes = {
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { enroll, unenroll })(LessonCard);
