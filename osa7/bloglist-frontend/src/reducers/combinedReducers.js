import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducer';

const reducer = combineReducers({
  notification: notificationReducer
});

export default reducer;