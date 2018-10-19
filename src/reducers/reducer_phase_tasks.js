
import { FETCH_PHASE_TASKS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_TASKS:
      return action.payload.data;
    default:
      return state;
  }
}
