import { useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blogs, setBlogs, blog}) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = async () => {
    const updatedBlog = await blogService.like(blog);
    setBlogs(blogs.map((b) => b.id === updatedBlog.id ? b = updatedBlog : b).sort((a, b) => b.likes - a.likes));
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
            <button onClick={handleClick}>like</button> 
          </div>
          <div>{blog.user.name}</div>
        </>
      }
    </div>
  )
}

export default Blog
