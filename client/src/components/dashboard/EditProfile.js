import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { upsertProfile } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, upsertProfile, getCurrentProfile }) => {
  const [formData, setFormData] = useState({
    username: '',
    instruments: '',
    level: '',
    type: '',
    genres: [],
    bio: '',
  });

  useEffect(() => {
    getCurrentProfile();

    console.log('Profile retrieve in edit form => ', profile);
    setFormData({
      username: loading || !profile.username ? '' : profile.username,
      instruments: loading || !profile.instruments ? '' : profile.instruments,
      level: loading || !profile.level ? '' : profile.level,
      type: loading || !profile.type ? '' : profile.type,
      genres: loading || !profile.genres ? '' : profile.genres,
      bio: loading || !profile.bio ? '' : profile.bio,
    });
  }, [getCurrentProfile, loading, profile]);

  const { username, type, instruments, level, genres, bio } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile data submitted from form => ', formData);

    upsertProfile(formData, navigate, true);
  };

  return (
    <div className='auth-container'>
      <form className='auth-form'>
        <h1>Edit Profile</h1> <label htmlFor='name'>Username:</label>
        <input type='text' name='username' value={username} onChange={(e) => onChange(e)} placeholder='Username' />
        <label htmlFor='instruments'>Instruments</label>
        <input
          type='text'
          name='instruments'
          value={instruments}
          onChange={(e) => onChange(e)}
          placeholder='Instruments'
        />
        <label htmlFor='level'>Level:</label>
        <input type='text' name='level' value={level} onChange={(e) => onChange(e)} placeholder='Level' />
        <label htmlFor='type'>Type:</label>
        <input type='text' name='type' value={type} onChange={(e) => onChange(e)} placeholder='Type' />
        <label htmlFor='genres'>Genres:</label>
        <input type='text' name='genres' value={genres} onChange={(e) => onChange(e)} placeholder='Genres' />
        <label htmlFor='bio'>Biography:</label>
        <input type='text' name='bio' value={bio} onChange={(e) => onChange(e)} placeholder='Biography' />
        <button className='auth-button' onClick={(e) => onSubmit(e)}>
          Create
        </button>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  upsertProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { upsertProfile, getCurrentProfile })(EditProfile);
