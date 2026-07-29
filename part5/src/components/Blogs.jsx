import { Link } from 'react-router-dom'

const Blogs = ({blogs}) => {

  return (
    <div className="px-6 py-2 flex flex-col gap-2">
      <h2 className="text-2xl">blogs</h2>
      <ul className="blogs">
        {blogs.map(blog =>
          <li className="list-disc list-inside" key={blog.id}><Link className="hover:underline underline-offset-4" to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default Blogs
