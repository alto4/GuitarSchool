import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileCard from './ProfileCard';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className='container'>
          <h1>Students</h1>
          <p>Meet fellow students from around the world!</p>

          {profiles.length > 0 ? (
            <div className='profiles-container container'>
              {profiles.map((p) => (
                <ProfileCard profile={p} />
              ))}
            </div>
          ) : (
            <h4>No student profiles found.</h4>
          )}
        </section>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
