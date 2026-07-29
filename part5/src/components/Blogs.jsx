import { Link } from 'react-router-dom'
import PrimaryHeader from './PrimaryHeader'

const Blogs = ({blogs}) => {

  return (
    <div className="px-6 py-2 flex flex-col gap-4 items-center">
      <PrimaryHeader>Blogs</PrimaryHeader>
      <ul className="blogs">
        {blogs.map(blog =>
          <li className="list-disc list-inside text-xl" key={blog.id}><Link className="hover:underline underline-offset-4" to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default Blogs
