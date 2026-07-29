import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import storage from './utils/storage'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const user = storage.getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  return (
    <>
      <div className="links-container">
        <Link to="/">blogs</Link>
        {!user && <Link to="/login">login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
      <Routes>
        <Route path="/*" element={<Blogs blogs={blogs} setBlogs={setBlogs} user={user} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
