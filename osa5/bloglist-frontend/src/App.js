import React, { useState } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    const credentials = {username, password};
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      setUsername('');
      setPassword('');

      await blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs));
    } catch (error) {
      console.log('ERROR ', error.message);
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangePassword = ({ target }) => setPassword(target.value)

  const showLoginFormOrBlogs = () => {
    if (user === null) {
      return (<Login 
        username={username} 
        password={password} 
        onSubmit={handleLogin} 
        onChangeUsername={onChangeUsername} 
        onChangePassword={onChangePassword} />)
    } else {
      return (
        <div>
        <p>{user.name} logged in</p>
        <Blogs blogs={blogs} />
        </div>
      )
    }
  }

  return (
    <>
      <h1>Blogit</h1>

      <Notification message={errorMessage} />
      { showLoginFormOrBlogs() }
    </>
  );
}

export default App
