import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import PrimaryButton from './PrimaryButton'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
    navigate('/');
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <h2 className="text-2xl">create new</h2>
      <form className="flex flex-col gap-2 w-40" onSubmit={handleSubmit}>
        <Input label="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Input label="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <PrimaryButton type="submit">create</PrimaryButton>
      </form>
    </div>
  )
}

export default BlogForm
