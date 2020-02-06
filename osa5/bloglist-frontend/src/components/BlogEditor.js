import React from 'react'

const BlogEditor = ({onSubmit, 
  title, 
  author, 
  url, 
  onChangeTitle, 
  onChangeAuthor, 
  onChangeUrl}) => {
  return (
  <form onSubmit={onSubmit}>
    <div>
      <div>
        title
        <input 
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        author
        <input 
          type="text"
          value={author}
          onChange={onChangeAuthor}
        />
      </div>
      <div>
        url
        <input 
          type="text"
          value={url}
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