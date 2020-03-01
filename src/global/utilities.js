import moment from 'moment';
import axios from "axios";

// const setAuthToken = token => {
export function setAuthToken(token) {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
// export default setAuthToken;

export function formatDisplayDateWithMoment(date) {
return moment.utc(date).format('MMMM Do, YYYY');
}

export function isDatePast(date) {
  var now = new Date().toISOString();
  var midnight_last_night = now.substring(0, 10) + "T00:00:00.000Z";

  if (date > midnight_last_night || date == midnight_last_night) {
    return false;
  }
  return true;
}

export function isDateFuture(date) {
  var now = new Date().toISOString();

  if (date > now) {
    return true;
  }
  return false;
}

export function isDateWithinLastMonth(date) {
  var now = moment();


  if (moment(date).isBefore(moment(now)) && moment(date).isAfter(moment(now).subtract(31, 'days')) ) {
    return true;
  }
  return false;
}

export function returnRecentAndFutureEventsSortedChronologically(events) {
  var futureEvents = [];

  for (let event of events) {
    if (isDateFuture(event.start_date) || isDateWithinLastMonth(event.start_date) || (event.end_date && isDateWithinLastMonth(event.end_date))) {
      futureEvents.push(event)
    }
  }
  return sortChronologically(futureEvents);
}

export function returnFutureEventsSortedChronologically(events) {
  var futureEvents = [];

  for (let event of events) {
    if (!isDatePast(event.start_date)) {
      futureEvents.push(event)
    }
  }
  return sortChronologically(futureEvents);
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
