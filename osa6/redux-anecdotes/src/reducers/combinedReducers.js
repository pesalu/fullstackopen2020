import { combineReducers } from 'redux';
import { anecdoteReducer, notificationReducer } from './anecdoteReducer';
import { filterReducer } from './filterReducers';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

export default reducer;
