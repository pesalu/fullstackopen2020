import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import BlogEditor from './components/BlogEditor';
import Login from './components/Login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      console.log('USER ', user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    const credentials = {username, password};
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      setUsername('');
      setPassword('');

      // Set user with token to browsers memory
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      await blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs));

    } catch (error) {
      console.log('ERROR ', error.message);
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  const handleLogout = async (event) => {
    console.log('LOGOUT')
    setUser(null);
    setUsername('');
    setPassword('');
    window.localStorage.removeItem('loggedBloglistUser');
  }

  const updateView = async (newBlog, message) => {

    if (!newBlog) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      setBlogs(blogs.concat(newBlog));
      console.log('HERE!', newBlog)
      const msg = 'Blog \'' + newBlog.title + '\' by ' + newBlog.author + ' was added.';

      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }

  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangePassword = ({ target }) => setPassword(target.value);

  const showLoginFormOrBlogs = () => {
    if (user === null) {
      return (<Login
        username={username}
        password={password}
        onSubmit={handleLogin}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword} />
      );
    } else {
      return (
        <div>
          <span>
            {user.name} logged in 
            <button type="submit" onClick={handleLogout}>logout</button>
          </span>
          <BlogEditor updateView={updateView} />
          <Blogs blogs={blogs} />
        </div>
      )
    }
  }

  return (
    <>
      <h1>Blogit</h1>

      <Notification message={successMessage} />
      <Notification message={errorMessage} />
      { showLoginFormOrBlogs() }
    </>
  );
}

export default App
