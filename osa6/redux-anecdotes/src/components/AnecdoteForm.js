import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { createAndecdote, createNotification } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    const getDataFromEvent = (event) => {
      return event.target.anecdote.value;
    };

    event.preventDefault();
    const data = getDataFromEvent(event);
    event.target.anecdote.value = '';
    props.createAndecdote(data);
    props.createNotification('ANECDOTE_CREATED', 'You\'ve created anecdote \'' + data + '\'!', 5000);


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


const mapStateToProps = state => null;

const mapDispatchToProps = {
  createAndecdote,
  createNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);