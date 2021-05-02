import {FETCH_CONFIRMATION_EMAIL, UPDATE_EMAIL} from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_CONFIRMATION_EMAIL:
            return action.payload.data;
        case UPDATE_EMAIL:
            let updated_email = action.payload.data;
            if(state._id === updated_email._id) {
                return updated_email
            } else {
                return state;
            }
        default:
            return state;
    }
}
