
import {FETCH_DEFAULT_PHASE_EMAILS, CREATE_DEFAULT_EMAIL, UPDATE_EMAIL } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_EMAILS:
            return action.payload.data;
        case CREATE_DEFAULT_EMAIL:
            var new_email = action.payload.data;
            return [...state, new_email];
        case UPDATE_EMAIL:
            console.log('state', state)
            console.log('action', action)
        default:
            return state;
    }
}
