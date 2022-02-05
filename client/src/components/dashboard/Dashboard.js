import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && !profile ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {profile && profile.user.name}</p>
      {profile ? (
        <Fragment>
          <h2>Your Profile Information</h2>
          <span>Name: {profile?.user?.name}</span>
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
          <Link to='/edit-profile' className='auth-button'>
            <button>Edit Profile</button>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>Please set up a profile to get the best out of Guitar School.</p>
          <Link to='/create-profile'>Create Profile</Link>
        </Fragment>
      )}

      <button onClick={() => deleteAccount()}>Delete Account</button>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
