const Blog = ({user, blog, likeBlog, removeBlog}) => {

  return (
    <div className="blog">
      <h2>{blog.author}: {blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="likes">
        <span>likes {blog.likes}</span>
        {user && <button onClick={() => likeBlog(blog)}>like</button>}
      </div>
      <p>Added by {blog.user.name}</p>
      {user && user.username === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
    </div>
  )
}

export default Blog
