import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const client = useApolloClient()

  let LogoutButton = <button 
    onClick={() => {
      console.log('HERE>>>')
      setToken(null);
      localStorage.clear();
      client.resetStore();
    }}>
    Logout
  </button>

  let loginOrLogout = !token ? 
    <button onClick={() => setPage('login')}>Login</button> : LogoutButton

    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token && <button onClick={() => setPage('add')}>add book</button>}
          {loginOrLogout}
        </div>

        {error && <div>
          {error}
        </div>}
        <Authors
          show={page === 'authors'}
        />
  
        <Books
          show={page === 'books'}
        />

        {
          !!token &&
          <NewBook show={page === 'add'} />
        }
  
        <LoginForm setError={setError} setToken={setToken} show={page === 'login'}/>

      </div>);
}

export default App