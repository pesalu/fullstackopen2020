import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { findAllByText } from '@testing-library/dom';
import { Link } from 'react-router-dom';

import {Button} from '@material-ui/core'

const BlogListItem = ({ blog, handleLikesIncrements, handleRemovalOfBlog }) => {

  const [expanded, setExpanded] = useState('');
  const [likes, setLikes] = useState('');

  const blogStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const expandBlog = () => setExpanded(!expanded);
  const showWhenVisible = { display: expanded ? '' : 'none' };

  const showRemoveButton = { display: blog.canRemove ? '' : 'none' };

  const handleLikesIncrement = () => () => {
    setLikes(blog.likes);
    handleLikesIncrements(blog);
  };

  const removeBlog = () => () => {
    handleRemovalOfBlog(blog);
  };

  return (
    <div style={blogStyle}>

      <div style={{float: 'left'}}>
        <Link to={`/blogs/${blog.id}`}>
          <div 
            id="titleText"
            className='title'>
            {blog.title}
          </div>
        </Link>

        <div 
          id='authorText'
          className='author'>
          {blog.author}
        </div>



        <div className='details' style={showWhenVisible}>
          <div>
            {
              blog.user ? 'Added by user ' + blog.user.name : ''
            }
          </div>
          <div className='url'>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            <div id="numberOfLikesText">
              {blog.likes} likes  
            </div>
            <Button 
              id='blogLikeButton'
              className='likeButton' onClick={handleLikesIncrement()}
              color="primary"
              variant="contained"
              >
              Like
            </Button>
          </div>

          <div style={showRemoveButton}>
            <br />
            <Button id="blogDeletionButton" onClick={removeBlog()}>
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'right'}}>
        <Button id="showDetailsButton" onClick={expandBlog}>
          {!expanded ? 'Show details' : 'Hide details'}
        </Button>
      </div>
    </div>
  );
};

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired, 
  handleLikesIncrements: PropTypes.func.isRequired, 
  handleRemovalOfBlog: PropTypes.func.isRequired
};

export default BlogListItem;