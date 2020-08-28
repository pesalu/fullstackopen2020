import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { findAllByText } from '@testing-library/dom';

const Blog = ({ blog, handleLikesIncrements, handleRemovalOfBlog }) => {

  const [expanded, setExpanded] = useState('');
  const [likes, setLikes] = useState('');

  const blogStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const expandBlog = () => setExpanded(!expanded);
  const showWhenVisible = { display: expanded ? '' : 'none' };

  const showRemoveButton = { display: blog.canRemove ? '' : 'none' };

  const handleLikesIncrement = () => () => {
    blog.likes += 1;
    setLikes(blog.likes);
    handleLikesIncrements(blog);
  };

  const removeBlog = () => () => {
    handleRemovalOfBlog(blog);
  };

  return (
    <div style={blogStyle}>

      <div style={{float: 'left'}}>
        <div 
          id="titleText"
          className='title'>
          {blog.title}
        </div>

        <div 
          id='authorText'
          className='author'>
          {blog.author}
        </div>

        <div className='details' style={showWhenVisible}>
          <div className='url'>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            <span id="numberOfLikesText">
              {blog.likes} likes 
            </span>
            <button 
              id='blogLikeButton'
              className='likeButton' onClick={handleLikesIncrement()}>
              Like
            </button>
          </div>
          <div>
            {
              blog.user ? 'Added by user ' + blog.user.name : ''
            }
          </div>
          <div style={showRemoveButton}>
            <br />
            <button id="blogDeletionButton" onClick={removeBlog()}>Remove</button>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'right'}}>
        <button id="showDetailsButton" onClick={expandBlog}>
          {!expanded ? 'Show details' : 'Hide details'}
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired, 
  handleLikesIncrements: PropTypes.func.isRequired, 
  handleRemovalOfBlog: PropTypes.func.isRequired
};

export default Blog;