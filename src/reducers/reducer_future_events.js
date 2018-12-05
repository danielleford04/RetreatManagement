import { FETCH_EVENTS } from '../actions/index';
import { returnFutureEvents, sortChronologically } from '../global/utilities';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENTS:
    var futureEvents = returnFutureEvents(action.payload.data);
    var eventsSorted = sortChronologically(futureEvents);
      return eventsSorted;
    default:
      return state;
  }
}
