import { FETCH_EVENTS } from '../actions/index';
import { sortChronologically } from '../global/utilities';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENTS:

    var eventsSorted = sortChronologically(action.payload.data);
      return eventsSorted;
    default:
      return state;
  }
}
