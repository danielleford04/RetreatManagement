
import { FETCH_USER_DATA, CREATE_DEFAULT } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return action.payload.data;
     case CREATE_DEFAULT:
          return action.payload.data;
    default:
      return state;
  }
}
