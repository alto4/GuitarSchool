import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  console.log('profile data => ', profile);

  return (
    <Fragment>
      {loading || !profile ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Name: {profile?.user?.name}</h1>
          <span>Type: {profile?.type}</span>
          <p>Instruments:</p>
          <ul>
            {profile?.instruments.map((instrument) => (
              <li>{instrument}</li>
            ))}
          </ul>
          <p>Genres</p>
          <ul>
            {profile?.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
          <p>Bio: {profile?.bio} </p>
          <Link to='/profiles'>View All Profiles</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfileById,
})(Profile);
