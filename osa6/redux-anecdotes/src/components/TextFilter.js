import React from 'react';
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducers'

const TextFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterAnecdotes(event.target.value));
  };

  return (
    <div>
      Filter 
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default TextFilter;

