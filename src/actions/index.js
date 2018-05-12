import axios from 'axios';

const API_KEY = 'd336b62acf09e0ddcfce3f02d89f52e0';
// const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
const ROOT_URL = 'http://localhost:3000';

// export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_RETREATANTS = 'FETCH_RETREATANTS';

// export function fetchWeather(city) {
//   const url = `${ROOT_URL}&q=${city},us`
//   const request = axios.get(url);
//
//   return {
//     type: FETCH_WEATHER,
//     payload: request
//   }
// }

export function fetchRetreatants() {
  const request = axios.get(`${ROOT_URL}/retreatants`);

  return {
    type: FETCH_RETREATANTS,
    payload: request
  };

}
