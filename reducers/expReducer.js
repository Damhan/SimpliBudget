import {GET_EXP, DEL_EXP, ADD_EXP, CLEAR_EXP, SET_CLEAR} from './../actions/types';

const initialState = {
    exps: [],
    cat:0,
    catCounts: [{category: 'cat1', count: 0},{category:'cat2', count: 0}],
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
                exps: [action.payload, ...state.exps],
                catCounts: state.catCounts.map(
                    (cat) => cat.category === action.payload.category ? {...cat, count: cat.count + 1} : cat
                ),
                cat: state.cat + 1
            }
        case CLEAR_EXP:
            return {
                ...state,
                exps: [],
                cat: 0,
                catCounts: [{category: 'cat1', count: 0},{category:'cat2', count: 0}]
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