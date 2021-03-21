import { FETCH_CONFIRMATION_EMAIL } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_CONFIRMATION_EMAIL:
            // return _.mapKeys(action.payload.data, '_id');
            return action.payload.data;
        default:
            return state;
    }
}
