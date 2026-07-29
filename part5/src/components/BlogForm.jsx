import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
    navigate('/');
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
    </>
  )
}

export default BlogForm
