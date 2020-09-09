import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/anecdoteReducer';

const Notification = ({maxTimeVisible}) => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: 'visible'
  }

  if (maxTimeVisible && notification) {
    setTimeout(() => dispatch(clearNotification()), maxTimeVisible);
  }

  if (notification) {
    return (
      <div style={style}>{notification}</div>
    );
  }
  return null;

}

export default Notification