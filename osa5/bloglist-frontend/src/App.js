import React, { useState } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
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

  const getBlogComponents = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const loginForm = () => {
    if (user === null) {
      return (
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      )
    } else {
      return (
        <div>
        <p>{user.name} logged in</p>
        {getBlogComponents()}
        {/* {noteForm()} */}
        </div>
      )
    }

  }

  return (
    <>
      <h1>Blogit</h1>

      <Notification message={errorMessage} />
      { loginForm() }
    </>
  );
}

export default App
