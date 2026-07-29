import { useState } from 'react'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import PrimaryButton from './PrimaryButton'
import PrimaryHeader from './PrimaryHeader'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      console.log(err);
      setNotification('wrong username or password');
      setTimeout(() => setNotification(''), 2000);
    }
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-2 items-center">
      <PrimaryHeader>Log In</PrimaryHeader>
      <form className="flex flex-col gap-2 w-40" onSubmit={handleSubmit}>
        <Input label="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Input label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PrimaryButton type="submit">login</PrimaryButton>
      </form>
      {notification && <p>{notification}</p>}
    </div>
  )
}

export default LoginForm
