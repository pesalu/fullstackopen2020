import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {LOGIN, CURRENT_USER} from '../queries';

const LoginForm = ({setError, setToken, show}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  });

  const resultCurrentUser = useQuery(CURRENT_USER);

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
    if (resultCurrentUser && resultCurrentUser.data) {
      let favoriteGenre = resultCurrentUser.data.me ? resultCurrentUser.data.me.favoriteGenre : null;
      localStorage.setItem('library-user-favorite-genre', favoriteGenre);
    }
  }, [result.data, resultCurrentUser.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    login({variables: {username, password}});
  }

  if(!show) {
    return <></>;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password <input type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
}

export default LoginForm;