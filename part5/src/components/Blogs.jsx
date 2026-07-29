import { useState } from 'react'
import { useMatch, Link } from 'react-router-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({blogs, setBlogs, user}) => {
  const [notification, setNotification] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find(b => b.id === match.params.id) : null;

  const likeBlog = async (blog) => {
    const updatedBlog = await blogService.like(blog);
    setBlogs(blogs.map((b) => b.id === updatedBlog.id ? b = updatedBlog : b).sort((a, b) => b.likes - a.likes));
  }

  const removeBlog = async (blog) => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;
    await blogService.remove(blog);
    setBlogs(blogs.filter((b) => b.id !== blog.id));
    setNotification(`blog ${blog.title} by ${blog.author} removed`);
    setTimeout(() => setNotification(''), 2000);
  }

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({title, author, url});
      setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes));
      setNotification(`a new blog ${title} by ${author} added`);
      setTimeout(() => setNotification(''), 2000);
      setIsFormVisible(false);
    } catch (err) {
      console.log(err);
      setNotification("failed to create new blog");
      setTimeout(() => setNotification(''), 2000);
    }
  }

  return (
    <div>
      {!match &&
        <>
          <h2>blogs</h2>
          {notification && <p>{notification}</p>}
          {!isFormVisible &&
            <div className="blogs">
              {blogs.map(blog =>
                <Link to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
              )}
            </div>
          }
          {isFormVisible && <BlogForm createBlog={createBlog} setIsFormVisible={setIsFormVisible} />}
        </>
      }
      {match && <Blog user={user} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />}
    </div>
  )
}

export default Blogs
