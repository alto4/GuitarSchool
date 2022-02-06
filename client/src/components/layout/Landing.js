import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='hero-container container'>
      <div className='hero-text'>
        <h1>Welcome to Guitar School</h1>
        <p>We look forward to helping you in your musical journey.</p>
        <div className='button-container'>
          <Link to='register'>
            <button>Join Now</button>
          </Link>
          <Link to='login'>
            <button className='btn-secondary'>Sign In</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
