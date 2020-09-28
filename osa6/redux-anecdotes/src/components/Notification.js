import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: 'visible'
  }

  if (notification) {
    return (
      <div style={style}>{notification.notification}</div>
    );
  }

  return null;
}

export default Notification