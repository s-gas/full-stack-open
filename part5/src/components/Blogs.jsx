import { Link } from 'react-router-dom'

const Blogs = ({blogs}) => {

  return (
    <div>
      <h2>blogs</h2>
      <div className="blogs">
        {blogs.map(blog =>
          <Link to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
        )}
      </div>
    </div>
  )
}

export default Blogs
