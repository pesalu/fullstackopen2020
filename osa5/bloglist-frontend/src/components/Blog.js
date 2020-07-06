import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLikesIncrements, handleRemovalOfBlog }) => {

  const [expanded, setExpanded] = useState('');
  const [likes, setLikes] = useState('');

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

      <div className='title' onClick={expandBlog}>
        {blog.title}
      </div>

      <div className='author'>
        {blog.author}
      </div>

      <div className='details' style={showWhenVisible}>
        <div className='url'>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button className='likeButton' onClick={handleLikesIncrement()}>Like</button>
        </div>
        <div>
          {
            blog.user ? 'Added by user ' + blog.user.name : ''
          }
        </div>
        <div style={showRemoveButton}>
          <br />
          <button onClick={removeBlog()}>Remove</button>
        </div>
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