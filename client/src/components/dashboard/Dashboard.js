import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && !profile ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {profile && profile.user.name}</p>
      {profile ? (
        <Fragment>
          <h1>You already have a profile with this info as JSON:</h1>
          <p>{JSON.stringify(profile)}</p>
          <Link to='/edit-profile'>Edit Profile</Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>Please set up a profile to get the best out of Guitar School.</p>
          <Link to='/create-profile'>Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
