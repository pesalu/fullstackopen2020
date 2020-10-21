import React from 'react';
import BlogListItem from './Blog';
import {Link} from 'react-router-dom';

const Blogs = ({blogs, handleLikesIncrements, handleRemovalOfBlog}) => {
  blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  return (blogs.map(blog =>
      <BlogListItem
        key={blog.id}
        blog={blog}
        handleLikesIncrements={handleLikesIncrements}
        handleRemovalOfBlog={handleRemovalOfBlog}
      />
    )
  );
};

export default Blogs;