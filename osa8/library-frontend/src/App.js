import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription } from '@apollo/client';
import BookRecommendations from './components/BookRecommendations';
import { BOOK_ADDED } from './queries';



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (({subscriptionData}) => {
      window.alert(`Book '${subscriptionData.data.bookAdded.title}' added to library!`);
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