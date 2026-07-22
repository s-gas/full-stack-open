import { useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({user, blogs, setBlogs, blog}) => {
  const [isShown, setIsShown] = useState(false);

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
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setIsShown(!isShown)}>{isShown ? "hide" : "view"}</button>
      {isShown && 
        <>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button> 
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && <button onClick={handleRemove}>remove</button>}
        </>
      }
    </div>
  )
}

export default Blog
