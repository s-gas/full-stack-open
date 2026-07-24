import { useState } from 'react'

const BlogForm = ({createBlog, setIsFormVisible}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input onChange={(e) => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author:
            <input onChange={(e) => setAuthor(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            url:
            <input onChange={(e) => setUrl(e.target.value)}/>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setIsFormVisible(false)}>cancel</button>
    </>
  )
}

export default BlogForm
