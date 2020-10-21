import React from 'react'
import {useSelector} from 'react-redux'

const BlogDetails = ({blogId, handleLikesIncrements}) => {

  let blog = useSelector( state => {
    return !!state.blogs ? 
      state.blogs.find(blogTmp => blogTmp.id === blogId) : 
      null
  });

  if (!blogId) return null;

  const handleLikesIncrement = () => () => {
    handleLikesIncrements(blog);
  };

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
  </div>

  )
}

export default BlogDetails;