import React from 'react';
import { useDispatch } from 'react-redux';
import { createAndecdote, createNotification } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    const getDataFromEvent = (event) => {
      return event.target.anecdote.value;
    };
    
    event.preventDefault();
    const data = getDataFromEvent(event);
    event.target.anecdote.value = '';
    // const newAnecdote = await anecdoteService.createNew(anecdoteText);
    dispatch(createAndecdote(data));
    dispatch(createNotification('ANECDOTE_CREATED', 'You\'ve created anecdote \'' + data + '\'!', 1000))


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