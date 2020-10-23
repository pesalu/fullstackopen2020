import blogService from '../services/blogs';
import { initializeUsers } from './userReducer'

import { createNotification } from './notificationReducer';

export const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      return [...state];
    case 'COMMENT':
      return [...state];
    case 'CREATE':
      let newBlog = action.data;
      return [...state, newBlog];
    case 'REMOVE':
      return state.filter( blog => blog.id !== action.data.id );
    case 'INIT':
      return action.data;
    default:
      return state;
  }
}

export const create = (data) => {
  return async dispatch => {
    const newAnecdote = await blogService.create(data);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    });
  }
}

export const remove = (data) => {
  return async dispatch => {
    await blogService.remove(data);
    dispatch({
      type: 'REMOVE',
      data: data
    });
  }
}



export const initialize = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs
    })
    dispatch( initializeUsers() );
  }
}

export const like = (blog) => {
  return async dispatch => {
    blog.likes++;
    const updatedBlog = await blogService.update(blog);
    dispatch({
      type: 'LIKE',
      data: { id: updatedBlog.id, }
    });
  }
};

export const comment = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(blog.id, comment);
    dispatch( createNotification('BLOG_COMMENTED', `Blogia '${updatedBlog.title}' kommentoitu`, 5000) );
    dispatch({
      type: 'COMMENT',
      data: { id: updatedBlog.id }
    });
  }
}