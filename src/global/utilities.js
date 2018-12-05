import moment from 'moment';

export function formatDisplayDateWithMoment(date) {
return moment.utc(date).format('MMMM Do, YYYY');
}

export function isDatePast(date) {
  var now = new Date().toISOString();

  if (date < now) {
    return true;
  }
  return false;
}

export function returnFutureEvents(events) {
  var futureEvents = [];

  for (let event of events) {
    if (!isDatePast(event.start_date)) {
      futureEvents.push(event)
    }
  }
  return futureEvents;
}

export function sortChronologically(arr) {
  var eventsSorted = arr.sort(function(a, b) {
  var keyA = new Date(a.start_date),
      keyB = new Date(b.start_date);
  // Compare the 2 dates
  if(keyA < keyB) return -1;
  if(keyA > keyB) return 1;
  return 0;
});
    return eventsSorted;
}
