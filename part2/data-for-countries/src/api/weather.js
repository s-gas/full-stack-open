import axios from 'axios'

const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

const apiKey = import.meta.env.VITE_API_KEY;

const getCurrentWeather = (capital) => {
  const url = `${baseUrl}${capital}?key=${apiKey}`;
  const req = axios.get(url);
  return req.then(res => res.data.currentConditions);
}

export default { getCurrentWeather }
