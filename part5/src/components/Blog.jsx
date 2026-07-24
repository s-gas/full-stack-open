import { useState} from 'react'

const Blog = ({user, blog, likeBlog, removeBlog}) => {
  const [isShown, setIsShown] = useState(false);
 
  return (
    <div className="blog">
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setIsShown(!isShown)}>{isShown ? "hide" : "view"}</button>
      {isShown && 
        <>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={() => likeBlog(blog)}>like</button> 
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
        </>
      }
    </div>
  )
}

export default Blog
