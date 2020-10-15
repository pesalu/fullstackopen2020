import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import BlogEditor from './components/BlogEditor';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/logical/Togglable';
import {useDispatch, useSelector} from 'react-redux';

import { createNotification } from './reducers/notificationReducer';
import { initialize, create, like, remove } from './reducers/blogReducer';
import { login, logout } from './reducers/loginReducer';


const App = () => {
  const dispatch = useDispatch();

  let blogs = useSelector( state => !!state.blogs ? state.blogs : [] );

  let user = useSelector( state => !!state.user ? state.user : null );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const blogEditorRef = React.createRef();

  useEffect(() => {
    dispatch( initialize() );
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      blogService.setToken(user.token);
      dispatch( initialize() );
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {username, password};
    try {
      dispatch( login(credentials) );
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = async () => {
    setUsername('');
    setPassword('');
    dispatch( logout() );
    window.localStorage.removeItem('loggedBloglistUser');
  };

  const updateView = async (newBlog, message) => {
    if (!newBlog) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    } else {
      dispatch( create(newBlog) );
      dispatch( createNotification('BLOG_CREATED', `Blog '${newBlog.title}' created by ${newBlog.author}`, 5000) );
      blogEditorRef.current.toggleVisibility();
    }
  };

  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangePassword = ({ target }) => setPassword(target.value);

  const handleLikesIncrements = async (blog) => {
    try {
      dispatch( like(blog) );
      dispatch( createNotification('BLOG_LIKED', `Blogia '${blog.title}' tykätty`, 5000) );
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleRemovalOfBlog = async (blog) => {
    let removalConfirmed = window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}`);
    if (removalConfirmed) {
      try {
        dispatch( remove(blog) );
        dispatch( createNotification('BLOG_REMOVED', `Blog ${blog.title} removed.`, 5000) );
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

          <Togglable 
            buttonLabel="New blog" 
            ref={blogEditorRef}
          >
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
      <Notification />
      { showLoginFormOrBlogs() }
    </>
  );
};

export default App;
