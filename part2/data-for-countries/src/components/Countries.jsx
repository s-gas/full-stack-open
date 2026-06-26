import { useState, useEffect } from 'react'
import apiWeather from '../api/weather'

const toCelsius = (temp) => {
  const tempCelsius = (temp - 32) * 5 / 9;
  return tempCelsius.toFixed(2);
}

const Country = ({country}) => {
  const [weather, setWeather ] = useState(null);

  const capital = country.capital[0];

  useEffect(() => {
    apiWeather
      .getCurrentWeather(capital)
      .then(res => {
        const tempCelsius = toCelsius(res.temp);
        setWeather({temp: tempCelsius, windspeed: res.windspeed})
      });
  }, []);

  if (weather == null) return;

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
      <h2>Weather in {country.capital}</h2>
      <div>Temperature {weather.temp} Celsius</div>
      <div>Wind {weather.windspeed} m/s</div>
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
