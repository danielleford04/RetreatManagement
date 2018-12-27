
import { FETCH_PHASE_EMAILS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_EMAILS:
      return action.payload.data;
    default:
      return state;
  }
}
