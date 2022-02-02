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
    <div>
      <img src={avatar} alt={`Avatar of ${username}`} />
      <h2>{name}</h2>
      <p className='lead'>Instruments: {instruments.map((instrument) => instrument)}</p>
      <p className='lead'>Genres: {genres.map((genre) => genre)}</p>
      <Link to={`/profile/${_id}`}>View Profile</Link>
    </div>
  );
};

export default ProfileCard;
