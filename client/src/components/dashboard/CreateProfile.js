import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { upsertProfile } from '../../actions/profile';

const CreateProfile = ({ upsertProfile }) => {
  const [formData, setFormData] = useState({
    instruments: [],
    level: '',
    genres: [],
    bio: '',
  });

  const { username, instruments, level, genres, bio } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile data submitted from form => ', formData);

    upsertProfile(formData, navigate);
  };

  return (
    <div className='auth-container'>
      <form className='auth-form'>
        <h1>Create a Profile</h1> <label htmlFor='name'>Username:</label>
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
CreateProfile.propTypes = {
  upsertProfile: PropTypes.func.isRequired,
};

export default connect(null, { upsertProfile })(CreateProfile);
