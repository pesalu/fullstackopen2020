import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {Button, IconButton} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { comment } from '../reducers/blogReducer';

const BlogDetails = ({blogId, handleLikesIncrements}) => {
  const dispatch = useDispatch();

  const [commentVal, setComment] = useState('');

  let blog = useSelector( state => {
    return !!state.blogs ? 
      state.blogs.find(blogTmp => blogTmp.id === blogId) : 
      null
  });

  if (!blogId || !blog) return null;

  const handleLikesIncrement = () => () => {
    handleLikesIncrements(blog);
  };

  const handleCommenting = () => {
    blog.comments = !!blog.comments && blog.comments.concat(commentVal) || [commentVal];
    dispatch(comment(blog, commentVal));
  }

  const onChangeComment = ({target}) => {
    setComment(target.value);
  }

  return (
  <div>
    <div><h2>{blog.title}</h2></div>
    <div><a href={blog.url}>{blog.url}</a></div>
    <div>Likes {blog.likes}</div>
    <button 
      id='blogLikeButton'
      className='likeButton' onClick={handleLikesIncrement()}>
      Like
    </button>  

    <br/>

    <h3>Comments</h3>
    <div>
      <span>
        <input onChange={onChangeComment} type="text" /> 
        <Button onClick={handleCommenting}>Add a comment</Button>
      </span>
    </div>

    { (!!blog.comments && blog.comments.length > 0) ? 
     <div>
        <ul>
          {blog.comments.map(comment => <li>{comment}</li>)}
        </ul>
     </div>
     : 
     null 
    }
    
  </div>

  )
}

export default BlogDetails;