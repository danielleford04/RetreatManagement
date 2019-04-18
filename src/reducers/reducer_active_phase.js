import moment from 'moment';
import {  FETCH_EVENT_PHASES, SET_ACTIVE_PHASE } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_EVENT_PHASES:
      let event_type = action.meta.event_info.type;
      let active_phase_name;
      let active_phase_id;

      let today_formatted = moment().format('YYYY-MM-DD');
      let start_date_formatted = moment.utc(action.meta.event_info.start_date).format('YYYY-MM-DD');
      let end_date_formatted;
      if (event_type === 'residential' || event_type === 'class') {
        end_date_formatted = moment.utc(action.meta.event_info.end_date).format('YYYY-MM-DD');
      }
      let today = moment(today_formatted);
      let two_weeks_before = moment(start_date_formatted).subtract(14, 'days');
      let day_before = moment(start_date_formatted).subtract(1, 'days');
      let start_date = moment(start_date_formatted);
      let end_date = moment(end_date_formatted);


      if (today.isBefore(two_weeks_before)) {
        active_phase_name = 'Registration';
      } else if (today.isAfter(two_weeks_before)
      && today.isBefore(day_before) || today.isSame(two_weeks_before)) {
        active_phase_name = 'Preparation';
      } else if (today.isSame(day_before) || today.isSame(start_date) ) {
       active_phase_name = 'Arrival';
     } else if ( (event_type === 'residential' || event_type === 'class')  && today.isAfter(start_date) && today.isBefore(end_date) ){
        active_phase_name = 'During';
      } else if ( (event_type === 'residential' || event_type === 'class') && today.isSame(end_date)) {
        active_phase_name = 'Closing';
      } else if (
        ((event_type === 'residential' || event_type === 'class') &&  today.isAfter(end_date) ) ||
       (event_type === 'day' && today.isAfter(start_date))) {
        active_phase_name = 'Follow Up';
          }

        for (let phase of action.payload.data) {
          if (phase.name === active_phase_name) {
            active_phase_id = phase._id;
          }
        }

      return active_phase_id;
    case SET_ACTIVE_PHASE:
      return action.id;
    default:
      return state;
  }
}
