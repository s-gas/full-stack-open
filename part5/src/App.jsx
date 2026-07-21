import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  if (!user) {
    return <LoginForm setUser={setUser} />
  }
  return <Blogs user={user} setUser={setUser} />
}

export default App
