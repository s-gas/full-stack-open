import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user, setUser}) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  useEffect(() => {
    (async() => {
      try {
        const blogs = await blogService.getAll();
        setBlogs( blogs )
      } catch (err) {
        console.log("failed to fetch blogs");
      }
    })();
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const blog = await blogService.create({title, author, url});
      setBlogs(blogs.concat(blog));
      setNotification(`a new blog ${title} by ${author} added`);
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      console.log("failed to create new blog");
      setNotification("failed to create new blog");
      setTimeout(() => setNotification(''), 2000);
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <p>{notification}</p>}
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
      
      {!isFormVisible &&
        <div>
          <button onClick={() => setIsFormVisible(true)}>create new blog</button>
        </div>
      }
      {isFormVisible &&
        <>
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
          <button onClick={() => setIsFormVisible(false)}>cancel</button>
        </>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
