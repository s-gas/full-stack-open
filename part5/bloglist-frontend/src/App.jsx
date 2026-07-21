import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    (async() => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input onChange={(e) => setUsername(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
