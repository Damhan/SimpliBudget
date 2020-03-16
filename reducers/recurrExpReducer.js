import { GET_REC_EXP, ADD_REC_EXP, DEL_REC_EXP } from './../actions/types';

const initialState = {
    recurrExps: []
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_REC_EXP:
            return {
                ...state
            }
        case DEL_REC_EXP:
            return {
                ...state,
                recurrExps: state.recurrExps.filter(recurr => recurr.id !== action.payload)
            }
        case ADD_REC_EXP:
            return {
                ...state,
                recurrExps: [action.payload, ...state.recurrExps]
            }
        default:
            return state;
    }
}