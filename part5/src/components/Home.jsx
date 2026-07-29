import { useState, useEffect } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import Blogs from './Blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Home = ({user}) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find(b => b.id === match.params.id) : null;

  useEffect(() => {
    (async() => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      } catch (err) {
        console.log("failed to fetch blogs", err);
      }
    })();
  }, [])

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({title, author, url});
      setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes));
    } catch (err) {
      console.log(err);
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = await blogService.like(blog);
    setBlogs(blogs.map((b) => b.id === updatedBlog.id ? b = updatedBlog : b).sort((a, b) => b.likes - a.likes));
  }

  const removeBlog = async (blog) => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;
    await blogService.remove(blog);
    setBlogs(blogs.filter((b) => b.id !== blog.id));
    navigate("/");
  }

  return (
    <Routes>
      <Route path="/" element={<Blogs blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/blogs/:id" element={<Blog user={user} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />} />
      <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
    </Routes>
  );
};

export default Home;
