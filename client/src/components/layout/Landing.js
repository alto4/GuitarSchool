import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='hero-container container'>
      <div className='hero-text'>
        <h1>Welcome to Guitar School</h1>
        <p>
          We look forward to helping you in your musical journey. By providing a collection of curated vide lessons,
          written guides, and public domain sheet music, we are excited to foster an online community of guitar-seekers
          from around the world.
        </p>
        <Link to='register'>Join Now</Link>
        <Link to='login'>Sign In</Link>
      </div>
    </section>
  );
};

export default Landing;
