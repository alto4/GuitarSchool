import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar container'>
      <h1>
        <i className='fas fa-guitar'></i>Guitar School
      </h1>
      <ul className='nav-links'>
        <li>
          <a to='/home'>Home</a>
          <a to='/lessons'>Lessons</a>
          <a to='/login'>Login</a>
          <a to='/register'>Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
