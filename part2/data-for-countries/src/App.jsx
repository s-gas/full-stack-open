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

  const filtered = countries.filter((country) => (
    country.name.common.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <div>
      <label htmlFor="query-countries">find countries</label>
      <input type="text" name="query-countries" onChange={handleChange}/>
      <Countries countries={filtered} query={query} setQuery={setQuery}/>
    </div>
  )
}

export default App
