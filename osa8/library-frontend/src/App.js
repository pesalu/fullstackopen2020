import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import BookRecommendations from './components/BookRecommendations';
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries';



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id);

    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS });

    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : booksInStore.allBooks.concat(addedBook) }
      });

      let authorToBeUpdated = authorsInStore.allAuthors.find(author => author.id === addedBook.author.id);

      let bookCount = 1;
      if (authorToBeUpdated) {
        bookCount += authorToBeUpdated.bookCount;
      }

      let allAuthors = authorsInStore.allAuthors.filter(author => author.id !== addedBook.author.id).concat({...addedBook.author, bookCount: bookCount });

      client.writeQuery({
        query: ALL_AUTHORS, 
        data: { allAuthors : allAuthors }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (({subscriptionData}) => {
      let addedBook = subscriptionData.data.bookAdded;
      window.alert(`Book '${subscriptionData.data.bookAdded.title}' added to library!`);
      // Update cache
      updateCacheWith(addedBook);
    })
  });

  let LogoutButton = <button 
    onClick={() => {
      setToken(null);
      localStorage.clear();
      client.resetStore();
    }}>
    Logout
  </button>

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, []);

  let loginOrLogout = !token ? 
    <button onClick={() => setPage('login')}>Login</button> : LogoutButton

    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token && <button onClick={() => setPage('add')}>add book</button>}
          {token && <button onClick={
            () => setPage('book_recommendations')
          }>Recommendations</button>}
          {loginOrLogout}
        </div>

        {error && <div>
          {error}
        </div>}
        <Authors
          show={page === 'authors'}
          canEdit={!!token}
        />

        <Books
          show={page === 'books'}
        />

        {
          !!token && 
          <BookRecommendations show={page === 'book_recommendations'}></BookRecommendations>
        }

        {
          !!token &&
          <NewBook show={page === 'add'} />
        }

        <LoginForm setError={setError} setToken={setToken} show={page === 'login'}/>

      </div>);
}

export default App