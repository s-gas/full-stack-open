import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import storage from './utils/storage'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = storage.getUser();
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
