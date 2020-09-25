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

export default { getAll, createNew }