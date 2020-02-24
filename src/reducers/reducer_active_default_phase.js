import { SET_ACTIVE_DEFAULT_PHASE } from '../actions/index';

export default function(state = null, action) {
    switch(action.type) {
        case SET_ACTIVE_DEFAULT_PHASE:
            return action.id;
        default:
            return state;
    }
}
