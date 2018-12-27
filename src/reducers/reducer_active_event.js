import { FETCH_EVENTS, SET_ACTIVE_EVENT } from '../actions/index';
import { returnFutureEventsSortedChronologically } from '../global/utilities';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_EVENTS:
    if (state) {
      return state;
    }
    var futureEvents = returnFutureEventsSortedChronologically(action.payload.data);

      return futureEvents[0]._id;
      case SET_ACTIVE_EVENT:
      return action.id;
    default:
      return state;
  }
}
