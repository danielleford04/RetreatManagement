
import {FETCH_PHASE_EMAILS, UPDATE_EMAIL} from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_EMAILS:
      return action.payload.data;
    case UPDATE_EMAIL:
      let updated_email = action.payload.data;
      let new_state = [];
        for (let email of state) {
            if (email._id !== updated_email._id) {
                new_state.push(email)
            } else {
              new_state.push(updated_email)
            }
        }
        return new_state;
    default:
      return state;
  }
}
