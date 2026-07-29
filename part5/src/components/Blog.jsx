import PrimaryButton from './PrimaryButton';
import PrimaryHeader from './PrimaryHeader';

const Blog = ({ user, blog, likeBlog, removeBlog }) => {
  if (!blog) return null;
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-2">
      <PrimaryHeader>{blog.author}: {blog.title}</PrimaryHeader>
      <a className="hover:underline underline-offset-4" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <div className="flex gap-2 items-center">
        <span>{blog.likes} likes</span>
        {user && <PrimaryButton onClick={() => likeBlog(blog)}>like</PrimaryButton>}
      </div>
      <p>Added by {blog.user.name}</p>
      {user && user.username === blog.user.username && <PrimaryButton onClick={() => removeBlog(blog)}>remove</PrimaryButton>}
    </div>
  )
}

export default Blog
