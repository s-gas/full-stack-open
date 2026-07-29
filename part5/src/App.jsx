import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import storage from './utils/storage'

const App = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
        {user && <Link to="/create">new blog</Link>}
        {!user && <Link to="/login">login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
      <Routes>
        <Route path="/*" element={<Home user={user} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
