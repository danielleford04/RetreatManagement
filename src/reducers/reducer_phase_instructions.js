
import { FETCH_PHASE_INSTRUCTIONS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_INSTRUCTIONS:
    console.log('reducer_phase_instructions',action.payload.data)
      return action.payload.data;
    default:
      return state;
  }
}
