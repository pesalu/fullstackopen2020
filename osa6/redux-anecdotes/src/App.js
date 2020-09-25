import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import TextFilter from './components/TextFilter';

import {useDispatch} from 'react-redux';
import {initializeAnecdotes} from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   anecdoteService.getAll().then(
  //     anecdotes => dispatch(initializeAnecdotes(anecdotes))
  //   );
  // }, [dispatch]);

  useEffect(() => { dispatch(initializeAnecdotes()) },[dispatch]) ;

  return (
    <div>
      <TextFilter />
      <Notification maxTimeVisible={5000}/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App