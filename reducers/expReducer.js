import {GET_EXP, DEL_EXP, ADD_EXP, CLEAR_EXP, SET_CLEAR} from './../actions/types';

const initialState = {
    exps: [],
    lastClear: 2
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_EXP:
            return {
                ...state
            }
        case DEL_EXP:
            return {
                ...state,
                exps: state.exps.filter(exp => exp.id !== action.payload)
            }
        case ADD_EXP:
            return {
                ...state,
                exps: [action.payload, ...state.exps]
            }
        case CLEAR_EXP:
            return {
                ...state,
                exps: []
            }
        case SET_CLEAR:
            return {
                ...state,
                lastClear: action.payload
            }
        default:
            return state;
    }
}