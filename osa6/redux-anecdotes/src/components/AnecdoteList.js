import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, createNotification } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
  let anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(
        anecdote => anecdote.content.includes(state.filter)
      );
    }
    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(createNotification('ANECDOTE_VOTED', 'You\'ve voted \'' + anecdote.content + '\'!', 3000));
  };

  const byVotesDesc = (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes;

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotesDesc).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            {/* <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button> */}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Anecdotes;