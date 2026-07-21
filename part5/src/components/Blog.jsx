import { useState} from 'react'

const Blog = ({ blog }) => {
  const [isShown, setIsShown] = useState(false);
  
  return (
    <div>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setIsShown(!isShown)}>{isShown ? "hide" : "view"}</button>
      {isShown && 
        <>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.user.name}</div>
        </>
      }
    </div>
  )
}

export default Blog
