import {GET_BAL, SUB_BAL, INC_BAL} from './../actions/types';

const initialState = {
    balance: 0 
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_BAL:
            return {
                ...state
            }
        case SUB_BAL:
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case INC_BAL:
            return {
                ...state,
                balance: state.balance + action.payload
            }
        default:
            return state;
    }
}