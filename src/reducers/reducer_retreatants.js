// export default function() {
//   return [
//     { name: 'Bob James', email:'fake@glkasjd.com'},
//     { name: 'Denise Hill', email: 'aksjd@kjahdskj.com'},
//     { name: 'April Ludgate', email: 'email@email.com'},
//     { name: 'Michelle Ng', email: 'michelle@gnaskjd.com'}
//   ]
// }

import _ from 'lodash';
import { FETCH_RETREATANTS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_RETREATANTS:
      return _.mapKeys(action.payload.data, '_id');
    default:
      return state;
  }
}
