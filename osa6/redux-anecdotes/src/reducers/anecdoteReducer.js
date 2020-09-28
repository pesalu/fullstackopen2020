import { combineReducers } from 'redux';
import anecdotesService from '../services/anecdotes';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialAnecdotes = anecdotesAtStart.map(asObject)

// REDUCERS
export const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      return [...state];
    case 'CREATE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

export const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'ANECDOTE_VOTED':
      clearTimeoutOfPreviousNotification(state, action);
      return {notifId: action.notifId, notification: action.notificationText};
    case 'ANECDOTE_CREATED':
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


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});


// ACTION CREATORS
export const createAndecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(data);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    });
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.voteAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: { id: updatedAnecdote.id, }
    });
  }
};

export const createNotification = (notificationType, notificationText, showTime) => {
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


export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default reducer