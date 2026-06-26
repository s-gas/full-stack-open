import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import api from './api/countries'

function App() {
  const [countries, setCountries] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .getAll()
      .then(res => setCountries(res.data));
  }, []);

  if (countries == null) return null; 

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div>
      <label htmlFor="query-countries">find countries</label>
      <input type="text" name="query-countries" onChange={handleChange}/>
      <Countries countries={countries} query={query} />
    </div>
  )
}

export default App
