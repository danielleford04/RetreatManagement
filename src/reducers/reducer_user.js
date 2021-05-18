
import { FETCH_USER_DATA, CREATE_DEFAULT, CHECK_EMAIL_VERIFICATION_STATUS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USER_DATA:
      return action.payload.data;
     case CREATE_DEFAULT:
          return action.payload.data;
      case CHECK_EMAIL_VERIFICATION_STATUS:
        return action.payload.data.user;
    default:
      return state;
  }
}
