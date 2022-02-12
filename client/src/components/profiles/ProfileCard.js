import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({
  profile: {
    user: { _id, name, avatar },
    instruments,
    genres,
    level,
    bio,
    username,
  },
}) => {
  return (
    <div className='profile-card'>
      <img src={avatar} alt={`Avatar of ${username}`} />
      <div className='title'>
        <h2>{name}</h2>
      </div>
      <div className='body'>
        <p className='lead'>
          <strong>Instruments:</strong>
          <br /> {instruments.map((instrument) => instrument)}
        </p>
        <p className='lead'>
          <strong>Genres: </strong>
          <br />
          {genres.map((genre, index) => `${genre}${index !== genres.length - 1 ? ', ' : ''}`)}
        </p>
      </div>
      <div className='button-container'>
        <Link to={`/profile/${_id}`}>
          <button className='auth-button'>View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
