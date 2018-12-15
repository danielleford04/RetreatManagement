import { FETCH_EVENTS } from '../actions/index';
import { returnRecentAndFutureEventsSortedChronologically } from '../global/utilities';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENTS:
    var futureEvents = returnRecentAndFutureEventsSortedChronologically(action.payload.data);
      return futureEvents;
    default:
      return state;
  }
}
