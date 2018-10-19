import { FETCH_PHASE } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE:
      return action.payload.data;
    default:
      return state;
  }
}
