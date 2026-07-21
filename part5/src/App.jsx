import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import getUser from './utils/localStorage'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  if (!user) {
    return <LoginForm setUser={setUser} />
  }
  return <Blogs user={user} setUser={setUser} />
}

export default App
