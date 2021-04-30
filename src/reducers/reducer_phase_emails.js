
import {FETCH_PHASE_EMAILS, UPDATE_EMAIL} from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_EMAILS:
      return action.payload.data;
      case UPDATE_EMAIL:
        let updated_email = action.payload.data;
        let new_state = [];
          console.log('state 1', state)
          for (let email of state) {
            console.log('for')
              if (email._id !== updated_email._id) {
                console.log('if')
                  new_state.push(email)
                  // state[state.indexOf(email)] = email;
              } else {
                new_state.push(updated_email)
              }
          }
          console.log('state 2', state)
          console.log('action', action)
          return new_state;
    default:
      return state;
  }
}
