import React from 'react';
import BlogListItem from './Blog';
import {Link} from 'react-router-dom';

import {TableContainer, Table, TableBody, TableRow, TableCell, Paper} from '@material-ui/core';

const Blogs = ({blogs, handleLikesIncrements, handleRemovalOfBlog}) => {
  blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  return (
    <TableContainer component="Paper">
      <Table>
        <TableBody>
          {blogs.map(blog =>
            <TableRow>
              <TableCell>
                <BlogListItem
                  key={blog.id}
                  blog={blog}
                  handleLikesIncrements={handleLikesIncrements}
                  handleRemovalOfBlog={handleRemovalOfBlog}
                />
              </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default Blogs;