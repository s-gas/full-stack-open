import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user, setUser}) => {
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    (async() => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  const handleClick = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span><button onClick={handleClick}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
