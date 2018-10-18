import { FETCH_EVENTS } from '../actions/index';

export default function(state = [], action) {
  // console.log(1, state)
  switch(action.type) {
    case FETCH_EVENTS:
    // console.log(action.payload.data)
      return action.payload.data;
    default:
      return state;
  }
}
