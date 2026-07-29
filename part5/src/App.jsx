import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
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
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/*" element={<Home user={user} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
