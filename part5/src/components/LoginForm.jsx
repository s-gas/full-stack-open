import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.log(err);
      setNotification('wrong username or password');
      setTimeout(() => setNotification(''), 2000);
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      {notification && <p>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input onChange={(e) => setUsername(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
