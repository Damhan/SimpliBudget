import {GET_EXP, DEL_EXP, ADD_EXP} from './../actions/types';
import _uniqueId from 'lodash/uniqueId';

const initialState = {
    exps: [{id: _uniqueId(), amount: 10},
           {id: _uniqueId(), amount:50}]
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
                exps: state.exp.filter(exp => exp.id !== action.payload)
            }
        case ADD_EXP:
            return {
                ...state,
                exps: [action.payload, ...state.exps]
            }
        default:
            return state;
    }
}