import PrimaryButton from './PrimaryButton';

const Blog = ({ user, blog, likeBlog, removeBlog }) => {
  if (!blog) return null;
  return (
    <div className="flex flex-col items-start gap-2 px-6 py-2">
      <h2 className="text-2xl">{blog.author}: {blog.title}</h2>
      <a className="hover:underline underline-offset-4" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <div className="flex gap-2 items-center">
        <span>likes {blog.likes}</span>
        {user && <PrimaryButton onClick={() => likeBlog(blog)}>like</PrimaryButton>}
      </div>
      <p>Added by {blog.user.name}</p>
      {user && user.username === blog.user.username && <PrimaryButton onClick={() => removeBlog(blog)}>remove</PrimaryButton>}
    </div>
  )
}

export default Blog
