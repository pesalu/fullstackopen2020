import React, { useState } from 'react'
import blogService from '../services/blogs';

const BlogEditor = ({updateView}) => {

  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

  const onChangeTitle = ({ target }) => setTitle(target.value)
  const onChangeAuthor = ({ target }) => setAuthor(target.value)
  const onChangeUrl = ({ target }) => setUrl(target.value)

  const handleBlogSubmit = async (event) => {
    try {
      event.preventDefault();
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      const savedBlog = await blogService
        .create(newBlog);

      updateView(savedBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      let errorMessage = undefined;
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = error.message;
      }
      updateView(undefined, errorMessage);
    }

  }

  return (
  <form onSubmit={handleBlogSubmit}>
    <div>
      <div>
        title
        <input 
          type="text"
          value={newTitle}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        author
        <input 
          type="text"
          value={newAuthor}
          onChange={onChangeAuthor}
        />
      </div>
      <div>
        url
        <input 
          type="text"
          value={newUrl}
          onChange={onChangeUrl}
        />
      </div>

      <div>
        <button type="submit">Create</button>
      </div>
    </div>
  </form>
)};

export default BlogEditor;