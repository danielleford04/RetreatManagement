
import { FETCH_PHASE_TASKS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PHASE_TASKS:
    var tasksSorted = action.payload.data.sort(function(a, b) {
    var keyA = new Date(a.due_date),
        keyB = new Date(b.due_date);
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
    });
      return tasksSorted;
      // return action.payload.data;
    default:
      return state;
  }
}
