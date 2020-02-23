import { FETCH_DEFAULT_PHASES } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASES:
            return action.payload.data;
        default:
            return state;
    }
}
