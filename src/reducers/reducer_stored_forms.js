// export default function() {
//   return [
//     { name: 'Essential Retreat Information', date: '6/6/2018', notes: 'Send with Final Confirmation 2 wk prior'},
//     { name: 'Liability Waiver', date: '4/2/2017', notes: ''},
//     { name: 'Previous Experience Form', date: '4/2/2017', notes: 'Send with Final Confirmation 2 wk prior'},
//     { name: 'Meal Suggestions', date: '1/13/2018', notes: 'Send 1 wk prior'},
//     { name: 'Sample Schedule', date: '1/13/2018', notes: 'To send if retreatants ask'}
//   ]
// }

import _ from 'lodash';
import { FETCH_STORED_FORMS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_STORED_FORMS:
      // return _.mapKeys(action.payload.data, '_id');
      return action.payload.data;
    default:
      return state;
  }
}
