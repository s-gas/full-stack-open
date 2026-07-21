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
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={() => console.log("click")}>like</button> 
          </div>
          <div>{blog.user.name}</div>
        </>
      }
    </div>
  )
}

export default Blog
