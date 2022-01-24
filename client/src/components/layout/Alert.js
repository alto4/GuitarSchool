import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  // alerts !== null && alerts.length > 0 && alerts.map((alert) => <h3>{alert.message}</h3>);
  console.log('alerts => ', alerts);
  return alerts?.length > 0 && alerts.map((alert) => <h1>Alert: {alert.message}s</h1>);
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
