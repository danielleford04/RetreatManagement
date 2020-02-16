import { FETCH_DEFAULTS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_DEFAULTS:
      return action.payload.data;
    default:
      return state;
  }
}
