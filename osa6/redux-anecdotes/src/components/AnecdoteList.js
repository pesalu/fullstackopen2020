import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { vote, createNotification } from '../reducers/anecdoteReducer';

const Anecdotes = (props) => {

  const byVotesDesc = (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes;

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.sort(byVotesDesc).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.vote(anecdote);
              props.createNotification('ANECDOTE_VOTED', 'You\'ve voted \'' + anecdote.content + '\'!', 5000)
            }}>vote</button>
          </div>
        </div>
      )}

    </div>
  );
}

const mapStateToProps = state => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter(
      anecdote => anecdote.content.includes(state.filter)
    )};
  }
  return {anecdotes: state.anecdotes};
};

const mapDispatchToProps = {
  vote,
  createNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes);
