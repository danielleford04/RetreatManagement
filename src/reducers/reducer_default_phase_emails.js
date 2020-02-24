
import { FETCH_DEFAULT_PHASE_EMAILS } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_EMAILS:
            return action.payload.data;
        default:
            return state;
    }
}
