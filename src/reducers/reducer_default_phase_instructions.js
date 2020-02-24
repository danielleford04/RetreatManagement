
import { FETCH_DEFAULT_PHASE_INSTRUCTIONS } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_INSTRUCTIONS:
            return action.payload.data;
        default:
            return state;
    }
}
