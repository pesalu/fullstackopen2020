import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link, 
  useRouteMatch
} from "react-router-dom"

// Services
import loginService from './services/login';
import blogService from './services/blogs';

// Components
import Blogs from './components/Blogs';
import BlogEditor from './components/BlogEditor';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/logical/Togglable';
import { Users } from './components/Users';
import { User } from './components/User';
import BlogDetails from './components/BlogDetails';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import { createNotification } from './reducers/notificationReducer';
import { initialize, create, like, remove } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { login, logout } from './reducers/loginReducer';


const App = () => {
  const dispatch = useDispatch();

  let blogs = useSelector( state => !!state.blogs ? state.blogs : [] );
  let user = useSelector( state => !!state.user ? state.user : JSON.parse(window.localStorage.getItem('loggedBloglistUser')) );

  const [errorMessage, setErrorMessage] = useState(null);

  let users = useSelector( state => !!state.users ? state.users : [] );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogEditorRef = React.createRef();

  const urlUserId = useRouteMatch('/users/:id');
  const blogUrlObj = useRouteMatch('/blogs/:id');
  const urlBlogId = !!blogUrlObj ? blogUrlObj.params.id : null;

  const selectedUser = urlUserId && users ? users.find(otherUser => otherUser.id === urlUserId.params.id) : null;

  // const selectedBlog = !!urlBlogId && !!blogs.length ? blogs.find(blog => blog.id === urlBlogId.params.id) : null;

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      dispatch( initialize() );
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      dispatch(login(credentials));
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

  const showLoginFormOrBlogs = (user) => {
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
          <Switch>
            <Route path="/users/:id">
              <User user={selectedUser} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails blogId={urlBlogId} handleLikesIncrements={handleLikesIncrements} />
            </Route>
            <Route path="/blogs">
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
            </Route>
          </Switch>
        </div>
      );
    }
  };

  return (
    <>
      <h1>Blogit</h1>
      <Notification />
      { showLoginFormOrBlogs(user) }
    </>
  );
};

export default App;