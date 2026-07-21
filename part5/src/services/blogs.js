import axios from 'axios'
import getUser from '../utils/localStorage'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (blog) => {
  const user = getUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const response = await axios.post(baseUrl, blog, config) 
  return response.data;
}

export default { getAll, create }
