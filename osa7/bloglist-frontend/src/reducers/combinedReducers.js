import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducer';
import { blogReducer } from './blogReducer';
import { loginReducer } from './loginReducer';
import { userReducer } from './userReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer
});

export default reducer;