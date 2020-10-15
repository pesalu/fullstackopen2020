import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Notification = () => {

  const message = useSelector(state => state.notification != null ? state.notification.notification : null);

  if (message === null) {
    return null;
  }

  return (
    <div id="error-message" className="error">
      {message}
    </div>
  );
};

export default Notification;