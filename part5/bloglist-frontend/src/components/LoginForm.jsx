import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
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
