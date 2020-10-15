import loginService from '../services/login';
import blogService from '../services/blogs'

import { initialize } from '../reducers/blogReducer'

export const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      console.log('ACT ', action.data)
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user
    })
    dispatch( initialize() );
  }
}