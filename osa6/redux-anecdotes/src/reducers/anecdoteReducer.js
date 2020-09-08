import { combineReducers } from 'redux';

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
export const anecdoteReducer = (state = initialAnecdotes, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return state.map(anec => {
        if (anec.id === action.data.id) {
          anec.votes += 1;
        };
        return anec;
      });
    case 'CREATE':
      return [...state, action.data];
    default: return state;
  }
}

export const notificationReducer = (state = 'ANECDOTE_VOTED', action) => {
  console.log('STATE ', state, action);

  switch(action.type) {
    case 'ANECDOTE_VOTED':
      return action.notificationText;
    case 'ANECDOTE_CREATED':
      return action.notificationText;
    default:
      return state;
  }
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});


// ACTION CREATORS
export const createAndecdote = (anecdoteText) => {
  return {
    type: 'CREATE',
    data: asObject(anecdoteText)
  }
}

export const vote = (id) => {
  console.log('vote', id)

  return {
    type: 'VOTE',
    data: { id }
  }
};

export const createNotification = (notificationType, notificationText) => {
  return {
    type: notificationType,
    notificationText: notificationText
  }
}

export default reducer