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
