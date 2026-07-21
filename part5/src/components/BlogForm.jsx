import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setNotification, setIsFormVisible}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(title, author, url);
    try {
      const blog = await blogService.create({title, author, url});
      setBlogs(blogs.concat(blog));
      setNotification(`a new blog ${title} by ${author} added`);
      setTimeout(() => setNotification(''), 2000);
      setIsFormVisible(false);
    } catch (err) {
      console.log(err);
      setNotification("failed to create new blog");
      setTimeout(() => setNotification(''), 2000);
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title:
            <input onChange={(e) => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author:
            <input onChange={(e) => setAuthor(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            url:
            <input onChange={(e) => setUrl(e.target.value)}/>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => setIsFormVisible(false)}>cancel</button>
    </>
  )
}

export default BlogForm
