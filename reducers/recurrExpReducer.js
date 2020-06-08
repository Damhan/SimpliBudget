import { GET_REC_EXP, ADD_REC_EXP, DEL_REC_EXP } from './../actions/types';

const initialState = {
    recurrExps: [],
    cat:0,
    recurrCatCounts: [{category: 'cat1', count: 0},{category:'cat2', count: 0}],
    recurrCatsInitialized: false
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
                recurrExps: [action.payload, ...state.recurrExps],
                recurrCatCounts: state.recurrCatCounts.map(
                    (cat) => cat.category === action.payload.category ? {...cat, count: cat.count + 1} : cat
                ),
                recurrCatsInitialized: true,
                cat: state.cat + 1
            }
        default:
            return state;
    }
}