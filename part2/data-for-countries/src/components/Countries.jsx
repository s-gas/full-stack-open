import { useState } from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const Countries = ({countries, query, setQuery}) => {
  if (!query || !countries) return null;

  const handleClick = (country) => {
    setQuery(country.name.common);
  }

  if (countries.length > 10) return <div>Too many matches, specify another filter</div>;
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => handleClick(country)}>Show</button>
          </div>
        ))}
      </div>
    );
  };
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return <div>No matches, specify another filter</div>;
}

export default Countries
