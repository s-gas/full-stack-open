import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user}) => {
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    (async() => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
