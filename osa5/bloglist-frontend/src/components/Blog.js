import React, { useState } from 'react'

const Blog = ({ blog, handleLikesIncrements }) => {

  const [expanded, setExpanded] = useState('');
  const [likes, setLikes] = useState('');

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const expandBlog = () => setExpanded(!expanded);
  const showWhenVisible = { display: expanded ? '' : 'none' };

  const handleLikesIncrement = () => () => {
    blog.likes += 1;
    setLikes(blog.likes);
    handleLikesIncrements(blog);
  }

  return (
    <div style={blogStyle}>
      <div onClick={expandBlog}>
        {blog.title}
      </div>
      {blog.author}
      <div style={showWhenVisible}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLikesIncrement()}>Like</button>
        </div>
        <div>
          {
            blog.user ? 'Added by user ' + blog.user.name : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Blog