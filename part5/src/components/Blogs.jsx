import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({user, setUser}) => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  useEffect(() => {
    (async() => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      } catch (err) {
        console.log("failed to fetch blogs", err);
      }
    })();
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const handleLike = async () => {
    const updatedBlog = await blogService.like(blog);
    setBlogs(blogs.map((b) => b.id === updatedBlog.id ? b = updatedBlog : b).sort((a, b) => b.likes - a.likes));
  }

  const handleRemove = async () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;
    await blogService.remove(blog);
    setBlogs(blogs.filter((b) => b.id !== blog.id));
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <p>{notification}</p>}
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
      
      {!isFormVisible &&
        <div>
          <button onClick={() => setIsFormVisible(true)}>create new blog</button>
          {blogs.map(blog =>
            <Blog key={blog.id} user={user} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
          )}
        </div>
      }
      {isFormVisible && <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} setIsFormVisible={setIsFormVisible}/>}
    </div>
  )
}

export default Blogs
