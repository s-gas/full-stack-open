import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async() => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!user && 
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
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
              </label>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      }
      {user &&
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App
