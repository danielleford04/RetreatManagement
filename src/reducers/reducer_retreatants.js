import _ from 'lodash';
import { FETCH_RETREATANTS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_RETREATANTS:
      // return _.mapKeys(action.payload.data, '_id');
      return action.payload.data;
    default:
      return state;
  }
}
