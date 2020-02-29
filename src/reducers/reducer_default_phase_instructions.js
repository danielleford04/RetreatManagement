
import {FETCH_DEFAULT_PHASE_INSTRUCTIONS, CREATE_DEFAULT_INSTRUCTION, CREATE_DEFAULT_TASK} from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DEFAULT_PHASE_INSTRUCTIONS:
            return action.payload.data;
        case CREATE_DEFAULT_INSTRUCTION:
            var new_instruction = action.payload.data;
            return [...state, new_instruction]
        default:
            return state;
    }
}
