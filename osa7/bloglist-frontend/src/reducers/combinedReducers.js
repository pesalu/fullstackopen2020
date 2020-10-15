import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducer';
import { blogReducer } from './blogReducer';
import { loginReducer } from './loginReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer
});

export default reducer;