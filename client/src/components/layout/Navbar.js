import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <ul className='nav-links'>
      <li>
        <Link to='/'>Home</Link>
        <Link to='/lessons'>Lessons</Link>
        <Link to='/profiles'>Students</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className='nav-links'>
      <li>
        <Link to='/lessons'>Lessons</Link>
        <Link to='/profiles'>Students</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login' onClick={logout}>
          <i className='fa fa-sign-out'></i>Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <i className='fas fa-guitar'></i>Guitar School
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated
            ? // <ul className='nav-links'>
              //   <li>
              //     <Link to='/'>Home</Link>
              //     <Link to='/lessons'>Lessons</Link>
              //     <Link to='/dashboard'>Dashboard</Link>
              //     <Link to='/login' onClick={logout}>
              //       <i className='fa fa-sign-out'></i>Logout
              //     </Link>
              //   </li>
              // </ul>
              authLinks
            : // <ul className='nav-links'>
              //   <li>
              //     <Link to='/'>Home</Link>
              //     <Link to='/lessons'>Lessons</Link>
              //     <Link to='/login'>Login</Link>
              //     <Link to='/register'>Register</Link>
              //     <Link to='/dashboard'>Dashboard</Link>
              //   </li>
              // </ul>

              guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
