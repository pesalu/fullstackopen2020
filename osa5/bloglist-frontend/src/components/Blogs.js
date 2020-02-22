import React from 'react';
import Blog from './Blog';

const Blogs = ({blogs, handleLikesIncrements, handleRemovalOfBlog}) => {
  blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  return (blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      handleLikesIncrements={handleLikesIncrements}
      handleRemovalOfBlog={handleRemovalOfBlog}
    />)
  );
};

export default Blogs;