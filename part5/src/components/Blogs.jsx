import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user, setUser}) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    (async() => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const blog = await blogService.create({title, author, url});
    setBlogs(blogs.concat(blog));
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
      
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
