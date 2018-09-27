import axios from 'axios';

const API_KEY = 'd336b62acf09e0ddcfce3f02d89f52e0';
// const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
const ROOT_URL = 'http://localhost:3000';

// export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_RETREATANTS = 'FETCH_RETREATANTS';
export const CREATE_RETREATANT = 'CREATE_RETREATANT';
export const CREATE_EMAIL = 'CREATE_EMAIL';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_STORED_FORM = 'CREATE_STORED_FORM';

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

export function createRetreatant(values, callback) {
  const request = axios.post(`${ROOT_URL}/retreatants`, values)
    .then(() => callback());

  return {
    type: CREATE_RETREATANT,
    payload: request
  }
}

export function createEmail(values, callback) {
  const request = axios.post(`${ROOT_URL}/emails`, values)
    .then(() => callback());

  return {
    type: CREATE_EMAIL,
    payload: request
  }
}

export function fetchEvents() {
  const request = axios.get(`${ROOT_URL}/events`);

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function createEvent(values, callback) {
  const request = axios.post(`${ROOT_URL}/events`, values)
    .then(() => callback());

  return {
    type: CREATE_EVENT,
    payload: request
  }
}

export function createStoredForm(values, callback) {
  console.log(values);
  const request = axios.post(`${ROOT_URL}/storedForms`, values)
    .then(() => callback());

  return {
    type: CREATE_STORED_FORM,
    payload: request
  }
}
