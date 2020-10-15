import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducer';
import { blogReducer } from './blogReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
});

export default reducer;