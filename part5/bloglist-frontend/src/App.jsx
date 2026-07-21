import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginForm setUser={setUser} />
  }
  return <Blogs />
}

export default App
