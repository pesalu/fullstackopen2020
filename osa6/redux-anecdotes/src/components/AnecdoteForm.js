import React from 'react';
import { useDispatch } from 'react-redux';
import { createAndecdote, createNotification } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(anecdoteText);
    dispatch(createAndecdote(newAnecdote));
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