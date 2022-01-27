import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ isLoggedIn, component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
  if (isAuthenticated && !loading) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
