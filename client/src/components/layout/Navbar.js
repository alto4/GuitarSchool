import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <i className='fas fa-guitar'></i>Guitar School
      </h1>
      <ul className='nav-links'>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/lessons'>Lessons</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
