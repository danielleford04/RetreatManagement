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
export const DELETE_INSTRUCTION = 'DELETE_INSTRUCTION';
export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_EMAIL = 'DELETE_EMAIL';
export const CREATE_RETREATANT = 'CREATE_RETREATANT';
export const CREATE_EMAIL = 'CREATE_EMAIL';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SEND_EMAIL_NOW = 'SEND_EMAIL_NOW';
export const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
export const SET_ACTIVE_PHASE = 'SET_ACTIVE_PHASE';
export const SET_ACTIVE_DEFAULT_PHASE = 'SET_ACTIVE_DEFAULT_PHASE';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const FETCH_EVENT_PHASES = 'FETCH_EVENT_PHASES';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_INSTRUCTION = 'CREATE_INSTRUCTION';
export const FETCH_FILES = 'FETCH_FILES';
export const CREATE_FILE = 'CREATE_FILE';
export const CREATE_DEFAULT = 'CREATE_DEFAULT';
export const CREATE_DEFAULT_INSTRUCTION = 'CREATE_DEFAULT_INSTRUCTION';
export const CREATE_DEFAULT_TASK = 'CREATE_DEFAULT_TASK';
export const CREATE_DEFAULT_EMAIL = 'CREATE_DEFAULT_EMAIL';
export const FETCH_DEFAULT_PHASES = 'FETCH_DEFAULT_PHASES';
export const FETCH_DEFAULT_PHASE_EMAILS = 'FETCH_DEFAULT_PHASE_EMAILS';
export const FETCH_DEFAULT_PHASE_INSTRUCTIONS = 'FETCH_DEFAULT_PHASE_INSTRUCTIONS';
export const FETCH_DEFAULT_PHASE_TASKS = 'FETCH_DEFAULT_PHASE_TASKS';
export const FETCH_CONFIRMATION_EMAIL = 'FETCH_CONFIRMATION_EMAIL';

export const VERIFY_EMAIL_ADDRESS = 'VERIFY_EMAIL_ADDRESS';
export const CHECK_EMAIL_VERIFICATION_STATUS = 'CHECK_EMAIL_VERIFICATION_STATUS';

// Register User
export const register = (userData, history) => dispatch => {
  axios
    .post(`${ROOT_URL}/users/register`, userData)
    .then((response) => dispatch(login({email: userData.email, password: userData.password})))
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
export function deleteInstruction(instruction_id, callback) {
    const request = axios.delete(`${ROOT_URL}/instructions/${instruction_id}`)
        .then(() => callback())
        .catch(() => error());
    return {
        type: DELETE_INSTRUCTION,
        payload: request
    }
}

export function deleteTask(task_id, callback) {
    const request = axios.delete(`${ROOT_URL}/tasks/${task_id}`)
        .then(() => callback())
        .catch(() => error());
    return {
        type: DELETE_TASK,
        payload: request
    }
}

export function deleteEmail(email_id, callback) {
    const request = axios.delete(`${ROOT_URL}/emails/${email_id}`)
        .then(() => callback())
        .catch(() => error());
    return {
        type: DELETE_EMAIL,
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

export function sendEmailNow(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/emails/send`, values)
        .then(() => callback())
        .catch(() => error());

    return {
        type: SEND_EMAIL_NOW,
        payload: request
    }
}

export function verifyEmail(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/emails/verify`, values)
        .then(() => callback())
        .catch(() => error());

    return {
        type: VERIFY_EMAIL_ADDRESS,
        payload: request
    }
}

export function checkEmailVerificationStatus(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/emails/verification-status`, values)


    return {
        type: CHECK_EMAIL_VERIFICATION_STATUS,
        payload: request
    }
}

export function updateEmail(values, callback, error) {
    const request = axios.put(`${ROOT_URL}/emails/${values.email_id}`, values)
        request.then(() => callback())
        request.catch(() => error());

    return {
        type: UPDATE_EMAIL,
        payload: request
    }
}

export function fetchEvents() {
  const request = axios.get(`${ROOT_URL}/events/user`);

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

export function fetchDefaultPhases(event_id) {
    const request = axios.get(`${ROOT_URL}/phases/event/${event_id}`);
    // let active_event_info = {};
    // for (let event of events) {
    //     if (event._id === event_id) {
    //         active_event_info = event;
    //     }
    // }
    return {
        type: FETCH_DEFAULT_PHASES,
        // meta: { event_info: active_event_info },
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

export function createDefaultTask(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/tasks`, values);
    callback();
    return {
        type: CREATE_DEFAULT_TASK,
        payload: request
    }
}

export function createDefaultInstruction(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/instructions`, values);
    callback();
    return {
        type: CREATE_DEFAULT_INSTRUCTION,
        payload: request
    }
}

export function createDefaultEmail(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/emails`, values);
    callback();
    return {
        type: CREATE_DEFAULT_EMAIL,
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

export function setActiveDefaultPhase(id) {
    return {
        type: SET_ACTIVE_DEFAULT_PHASE,
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

export function createDefault(values, callback, error) {
    const request = axios.post(`${ROOT_URL}/defaults`, values);
    return {
        type: CREATE_DEFAULT,
        payload: request
    }
}

export function fetchDefaultPhaseInstructions(phase_id) {
    const request = axios.get(`${ROOT_URL}/instructions/phase/${phase_id}`);

    return {
        type: FETCH_DEFAULT_PHASE_INSTRUCTIONS,
        payload: request
    };
}

export function fetchDefaultPhaseTasks(phase_id) {
    const request = axios.get(`${ROOT_URL}/tasks/phase/${phase_id}`);

    return {
        type: FETCH_DEFAULT_PHASE_TASKS,
        payload: request
    };
}

export function fetchDefaultPhaseEmails(phase_id) {
    const request = axios.get(`${ROOT_URL}/emails/phase/${phase_id}`);

    return {

        type: FETCH_DEFAULT_PHASE_EMAILS,
        payload: request
    };
}

export function fetchConfirmationEmail(event_id) {
    const request = axios.get(`${ROOT_URL}/emails/confirmation/${event_id}`);

    return {

        type: FETCH_CONFIRMATION_EMAIL,
        payload: request
    };
}
