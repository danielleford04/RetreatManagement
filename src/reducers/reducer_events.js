import { FETCH_EVENTS } from '../actions/index';
import { isDatePast } from '../global/utilities';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENTS:
    //removes past events, and sorts events into chronological order
    var futureEvents = [];

    for (let event of action.payload.data) {
      if (!isDatePast(event.start_date)) {
        futureEvents.push(event)
      }
    }
    var futureEventsSorted = futureEvents.sort(function(a, b) {
    var keyA = new Date(a.start_date),
        keyB = new Date(b.start_date);
    // Compare the 2 dates
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
});
      return futureEventsSorted;
    default:
      return state;
  }
}
