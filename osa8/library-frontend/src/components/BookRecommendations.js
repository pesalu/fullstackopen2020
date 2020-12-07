import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries';

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)

  if(result.loading) {
    return <div>loading... </div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks;

  let userFavoriteGenre = localStorage['library-user-favorite-genre'];
  const recommendedBooks = userFavoriteGenre && userFavoriteGenre !== 'all genres' ? books.filter(book => book.genres.includes(userFavoriteGenre)) : [];

  const genres = new Set(); 
  books.forEach(book => {
    book.genres.forEach(
      genre => genres.add(genre)
    )
  });
  const genresA = [...genres];
  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre <strong>{userFavoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author != null ? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books