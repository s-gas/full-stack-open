import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (blog) => {
  const user = storage.getUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const response = await axios.post(baseUrl, blog, config) 
  return response.data;
}

const remove = async (blog) => {
  const user = storage.getUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(url, config) 
  return response.data;
}

const like = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }
  const url = `${baseUrl}/${blog.id}`;
  const user = storage.getUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const response = await axios.put(url, updatedBlog, config);
  return response.data;
}

export default { getAll, create, remove, like }
