import axios from 'axios'

const url = "/api/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then(res => res.data);
}

const create = (entry) => {
  const req = axios.post(url, entry);
  return req.then(res => res.data);
}

const update = (entry, id) => {
  const req = axios.put(`${url}/${id}`, entry);
  return req.then(res => res.data);
}

const remove = (entry) => {
  const req = axios.delete(`${url}/${entry.id}`);
  return req.then(res => res.data);
}

export default { getAll, create, update, remove }
