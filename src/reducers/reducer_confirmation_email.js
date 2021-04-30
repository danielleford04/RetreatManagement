import {FETCH_CONFIRMATION_EMAIL, UPDATE_EMAIL} from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_CONFIRMATION_EMAIL:
            // return _.mapKeys(action.payload.data, '_id');
            return action.payload.data;
        case UPDATE_EMAIL:
            let updated_email = action.payload.data;
            console.log('state 1', state)
            for (let email of state) {
                if (email._id == updated_email._id) {
                    state[state.indexOf(email)] = email;
                }
            }
            console.log('state 2', state)
            console.log('action', action)
            return state;
        default:
            return state;
    }
}
