import React from 'react';
import { useDispatch } from 'react-redux';
import { createAndecdote, createNotification } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAndecdote(anecdoteText));
    dispatch(createNotification('ANECDOTE_CREATED', 'You\'ve created anecdote \'' + anecdoteText + '\'!'))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;