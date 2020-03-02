import { FETCH_EVENT_PHASES } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENT_PHASES:
      console.log('fetch phases')
      return action.payload.data;
    default:
      return state;
  }
}
