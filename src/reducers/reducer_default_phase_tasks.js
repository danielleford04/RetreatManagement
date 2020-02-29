
import { FETCH_DEFAULT_PHASE_TASKS, CREATE_DEFAULT_TASK } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_TASKS:
            return action.payload.data;
        case CREATE_DEFAULT_TASK:
            var new_task = action.payload.data;
            return [...state, new_task]
        default:
            return state;
    }
}
