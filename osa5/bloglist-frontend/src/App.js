import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import BlogEditor from './components/BlogEditor';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/logical/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogEditorRef = React.createRef();

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
    }
  }, [blogs]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {username, password};
    try {
      const user = await loginService.login(credentials);

      setUser(user);
      setUsername('');
      setPassword('');

      // Set user with token to browsers memory
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      
      let initialBlogs = await blogService.getAll();

      setBlogs(initialBlogs);

    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setUsername('');
    setPassword('');
    window.localStorage.removeItem('loggedBloglistUser');
  };

  const updateView = async (newBlog, message) => {

    if (!newBlog) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      const savedBlog = await blogService
        .create(newBlog);

      blogEditorRef.current.toggleVisibility();

      setBlogs(blogs.concat(savedBlog));
      const msg = 'Blog \'' + savedBlog.title + '\' by ' + savedBlog.author + ' was added.';

      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangePassword = ({ target }) => setPassword(target.value);

  const handleLikesIncrements = async (blog) => {
    try {
      await blogService.update(blog);
      setBlogs(blogs);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleRemovalOfBlog = async (blog) => {
    let removalConfirmed = window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}`);
    if (removalConfirmed) {
      try {
        await blogService.remove(blog);
        setBlogs(blogs.filter(blogTmp => blogTmp.id !== blog.id));
      } catch (error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } else {
      return;
    }
  };

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
        <div id="logged-in-message">
          <span>
            {user.name} logged in 
            <button type="submit" onClick={handleLogout}>logout</button>
          </span>

          <Togglable buttonLabel="New blog" ref={blogEditorRef}>
            <BlogEditor updateView={updateView} />
          </Togglable>

          <Blogs blogs={blogs} 
            handleLikesIncrements={handleLikesIncrements} 
            handleRemovalOfBlog={handleRemovalOfBlog} 
          />
        </div>
      );
    }
  };

  return (
    <>
      <h1>Blogit</h1>

      <Notification message={successMessage} />
      <Notification message={errorMessage} />
      { showLoginFormOrBlogs() }
    </>
  );
};

export default App;
