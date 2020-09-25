import axios from 'axios';

const baseUrl = 'http://localhost:3008/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log('RESP ', response);
  return response.data;
}

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
}

const voteAnecdote = async (anecdote) => {
  anecdote.votes += 1;
  const response = await axios.put(baseUrl + '/' + anecdote.id, anecdote);
  return response.data;
}

export default { getAll, createNew, voteAnecdote }