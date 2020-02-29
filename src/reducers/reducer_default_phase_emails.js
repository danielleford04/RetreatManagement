
import {FETCH_DEFAULT_PHASE_EMAILS, CREATE_DEFAULT_EMAIL, CREATE_DEFAULT_TASK} from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_EMAILS:
            return action.payload.data;
        case CREATE_DEFAULT_EMAIL:
            var new_email = action.payload.data;
            return [...state, new_email]
        default:
            return state;
    }
}
