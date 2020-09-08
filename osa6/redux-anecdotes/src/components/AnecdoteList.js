import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, createNotification } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
  let anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const voteAnecdote = (anecdoteId) => {
    dispatch(vote(anecdoteId))
    dispatch(createNotification('ANECDOTE_VOTED', 'Anecdote ' + anecdoteId + ' voted!'));
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
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Anecdotes;