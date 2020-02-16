import axios from 'axios';
import { setAuthToken } from "../global/utilities.js";
import jwt_decode from "jwt-decode";

const API_KEY = 'd336b62acf09e0ddcfce3f02d89f52e0';
// const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
const ROOT_URL = 'http://localhost:3000';

export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const FETCH_USER_DATA = "FETCH_USER_DATA";

export const FETCH_EVENT_RETREATANTS = 'FETCH_EVENT_RETREATANTS';
export const FETCH_PHASE_INSTRUCTIONS = 'FETCH_PHASE_INSTRUCTIONS';
export const FETCH_PHASE_TASKS = 'FETCH_PHASE_TASKS';
export const FETCH_PHASE_EMAILS = 'FETCH_PHASE_EMAILS';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CREATE_RETREATANT = 'CREATE_RETREATANT';
export const CREATE_EMAIL = 'CREATE_EMAIL';
export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
export const SET_ACTIVE_PHASE = 'SET_ACTIVE_PHASE';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const FETCH_EVENT_PHASES = 'FETCH_EVENT_PHASES';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_INSTRUCTION = 'CREATE_INSTRUCTION';
export const FETCH_FILES = 'FETCH_FILES';
export const CREATE_FILE = 'CREATE_FILE';
export const FETCH_DEFAULTS = 'FETCH_DEFAULTS';


// Register User
export const register = (userData, history) => dispatch => {
  axios
    .post(`${ROOT_URL}/users/register`, userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const login = userData => dispatch => {
  axios
    .post(`${ROOT_URL}/users/login`, userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(fetchUserData(decoded.id))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logout = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export function fetchUserData(user_id) {
  const request = axios.get(`${ROOT_URL}/users/${user_id}`);

  return {

    type: FETCH_USER_DATA,
    payload: request
  };
}

export function fetchEventRetreatants(event_id) {
  const request = axios.get(`${ROOT_URL}/retreatants/event/${event_id}`);

  return {

    type: FETCH_EVENT_RETREATANTS,
    payload: request
  };
}
export function fetchPhaseInstructions(phase_id) {
  const request = axios.get(`${ROOT_URL}/instructions/phase/${phase_id}`);

  return {
    type: FETCH_PHASE_INSTRUCTIONS,
    payload: request
  };
}

export function fetchPhaseTasks(phase_id) {
  const request = axios.get(`${ROOT_URL}/tasks/phase/${phase_id}`);

  return {
    type: FETCH_PHASE_TASKS,
    payload: request
  };
}

export function fetchPhaseEmails(phase_id) {
  const request = axios.get(`${ROOT_URL}/emails/phase/${phase_id}`);

  return {

    type: FETCH_PHASE_EMAILS,
    payload: request
  };
}

export function updateTask(values, callback) {
  const request = axios.put(`${ROOT_URL}/tasks/${values.task_id}`, values)
    .then(() => callback())
    .catch(() => error());
  return {
    type: UPDATE_TASK,
    payload: request
  }
}

export function createRetreatant(values, callback, error) {
  const request = axios.post(`${ROOT_URL}/retreatants`, values)
    .then(() => callback())
    .catch(() => error());
  return {
    type: CREATE_RETREATANT,
    payload: request
  }
}

export function createEmail(values, callback, error) {
  const request = axios.post(`${ROOT_URL}/emails`, values)
    .then(() => callback())
.catch(() => error());

  return {
    type: CREATE_EMAIL,
    payload: request
  }
}

//send experiment
// export function createEmail(values, callback, error) {
//   // var mailOptions = {
//   //     from: '"Danielle" <danielleford04@gmail.com>', // sender address
//   //     to: 'danielleford04@gmail.com', // list of receivers
//   //     subject: 'A new survey has been submitted!', // Subject line
//   //     text: "Oops! Your email provider doesn't support html. View your updated report at localhost:3000/emailReport" , // plaintext body
//   // };
// values.body = values.body.replace(/\n/g, '<br>\n');
//   const request = axios.post(`${ROOT_URL}/emails/send`, values)
//     .then(() => callback())
//     .catch(() => error());
//
//   return {
//     type: CREATE_EMAIL,
//     payload: request
//   }
// }

export function fetchEvents() {
  const request = axios.get(`${ROOT_URL}/events`);

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function createEvent(values, callback, error) {
  const request = axios.post(`${ROOT_URL}/events`, values)
    .then((response) => callback(response.data))
    .catch(() => error());

  return {
    type: CREATE_EVENT,
    payload: request
  }
}

export function fetchEventPhases(event_id, events) {
  const request = axios.get(`${ROOT_URL}/phases/event/${event_id}`);
  let active_event_info = {};
  for (let event of events) {
    if (event._id === event_id) {
      active_event_info = event;
    }
  }
  return {
    type: FETCH_EVENT_PHASES,
    meta: { event_info: active_event_info },
    payload: request

  };
}

export function createTask(values, callback, error) {
  const request = axios.post(`${ROOT_URL}/tasks`, values)
    .then(() => callback())
    .catch(() => error());

  return {
    type: CREATE_TASK,
    payload: request
  }
}

export function createInstruction(values, callback, error) {
  const request = axios.post(`${ROOT_URL}/instructions`, values)
    .then(() => callback())
    .catch(() => error());

  return {
    type: CREATE_INSTRUCTION,
    payload: request
  }
}

export function setActiveEvent(id) {
  return {
      type: SET_ACTIVE_EVENT,
      id,
    };
}

export function setActivePhase(id) {
  return {
      type: SET_ACTIVE_PHASE,
      id,
    };
}

export function fetchFiles() {
  const request = axios.get(`${ROOT_URL}/files`);

  return {
    type: FETCH_FILES,
    payload: request
  };
}

export function createFile(values, callback, error) {
  const formData = new FormData();
    formData.append('file',values.file);
    formData.append('name',values.name);
    values.notes ? formData.append('note',values.notes) : null ;

  const request = axios.post(`${ROOT_URL}/files/`,  formData)

    .then(() => callback())
    .catch(() => error());
  return {
    type: CREATE_FILE,
    payload: request
  }
}

export function fetchDefaults(user_id) {
  const request = axios.get(`${ROOT_URL}/defaults/user/${user_id}`);

  return {

    type: FETCH_DEFAULTS,
    payload: request
  };
}
