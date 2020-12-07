import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries';

const Books = (props) => {

  let [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS)

  if(result.loading) {
    return <div>loading... </div>
  }
  
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks;

  const filteredBooks = genre && genre !== 'all genres' ? books.filter(book => book.genres.includes(genre)) : books;

  const genres = new Set(); 
  books.forEach(book => {
    book.genres.forEach(
      genre => genres.add(genre)
    )
  });
  const genresA = [...genres];
  
  console.log(genres)
  return (
    <div>
      <h2>books</h2>

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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author != null ? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
          {genresA.map(genre => 
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
          <button onClick={() => setGenre('all genres')}>All genres</button>
      </div>
    </div>
  )
}

export default Books