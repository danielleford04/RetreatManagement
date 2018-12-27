import moment from 'moment';
import {  FETCH_EVENT_PHASES, SET_ACTIVE_PHASE } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_EVENT_PHASES:
      let event_type = action.meta.event_info.type;
      let active_phase_name;
      let active_phase_id;

      let today = moment().format('YYYY-MM-DD');
      let start_date = moment.utc(action.meta.event_info.start_date).format('YYYY-MM-DD');
      let end_date;
      if (event_type === 'residential' || event_type === 'class') {
        end_date = moment.utc(action.meta.event_info.end_date).format('YYYY-MM-DD');
      }

      if (moment(today).isBefore(moment(start_date).subtract(14, 'days'))) {
        active_phase_name = 'Registration';
      } else if (moment(today).isAfter(moment(start_date).subtract(14, 'days'))
      && moment(today).isBefore(moment(start_date).subtract(1, 'days'))) {
        active_phase_name = 'Preparation';
      } else if (moment(today).isSame(moment(start_date).subtract(1, 'days')) || (today === start_date) ) {
       active_phase_name = 'Arrival';
     } else if ( (event_type === 'residential' || event_type === 'class')  && moment(today).isAfter(moment(start_date)) && moment(today).isBefore(moment(end_date)) ){
        active_phase_name = 'During';
      } else if ( (event_type === 'residential' || event_type === 'class') && today === end_date) {
        active_phase_name = 'Closing';
      } else if (
        ((event_type === 'residential' || event_type === 'class') &&  moment(today).isAfter(moment(end_date)) ) ||
       (event_type === 'day' && moment(today).isAfter(moment(start_date)))) {
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
