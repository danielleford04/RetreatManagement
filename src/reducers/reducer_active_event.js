import { FETCH_EVENTS, SET_ACTIVE_EVENT } from '../actions/index';
import { isDatePast } from '../global/utilities';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_EVENTS:
    if (state) {
      return state;
    }

    var futureEvents = [];

    for (let event of action.payload.data) {
      if (!isDatePast(event.start_date)) {
        futureEvents.push(event)
      }
    }

    var soonest = {
      id: futureEvents[0]._id,
      date: futureEvents[0].start_date
    }

    for (let event of futureEvents) {
      if (event.start_date < soonest.date) {
        soonest.id = event._id;
        soonest.date = event.start_date;
      }
    }

      return soonest.id;
      case SET_ACTIVE_EVENT:
      return action.id;
    default:
      return state;
  }
}
