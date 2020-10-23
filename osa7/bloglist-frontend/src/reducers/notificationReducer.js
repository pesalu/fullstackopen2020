export const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'BLOG_LIKED':
      clearTimeoutOfPreviousNotification(state, action);
      return {notifId: action.notifId, notification: action.notificationText};
    case 'BLOG_COMMENTED':
      clearTimeoutOfPreviousNotification(state, action);
      return {notifId: action.notifId, notification: action.notificationText};
    case 'BLOG_CREATED':
      clearTimeoutOfPreviousNotification(state, action);
      return {notifId: action.notifId, notification: action.notificationText};
    case 'BLOG_REMOVED':
      clearTimeoutOfPreviousNotification(state, action);
      return {notifId: action.notifId, notification: action.notificationText};
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

const clearTimeoutOfPreviousNotification = (state, action) => {
  if (state && state.notifId !== action.notifId) {
    console.log('CLEARING  ', state.notifId);
    clearTimeout(state.notifId);
  }
}

export const createNotification = (
    notificationType, notificationText, showTime
  ) => {
  return async dispatch => {

    let notifTimeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    },
    showTime);

    dispatch({
      notifId: notifTimeoutId,
      type: notificationType,
      notificationText: notificationText
    });

  }
}