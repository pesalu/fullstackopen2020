import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { ALL_BOOKS, ALL_AUTHORS } from '../queries';

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
    }
  }
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([]);
  const [notification, setNotification] = useState('');

  const [ createBook ] = useMutation(CREATE_BOOK,
    {refetchQueries: [ { query: ALL_BOOKS }, {query: ALL_AUTHORS} ]});

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    let publishedVal = parseInt(published);
    try {
      await createBook({ variables: {
        title, published: publishedVal,
        author, genres
       }});
    } catch (error) {
      let message;
      if (error.message.includes('Book validation')) {
        message = `Invalid book data: ${error.message}`;
      } else if (error.message.includes('Author validation')) {
        message = `Invalid author data: ${error.message}`;
      } else {
        message = error.message;
      }
      setNotification(message);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      { 
        notification && 
        <div>{notification}</div> 
      }
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook