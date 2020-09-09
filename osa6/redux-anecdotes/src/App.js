import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import TextFilter from './components/TextFilter';

const App = () => {
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