import { GET_REC_EXP, ADD_REC_EXP, DEL_REC_EXP } from './../actions/types';

const initialState = {
    recurrExps: [],
    cat:0,
    recurrCatCounts: [{category: 'house', count: 0},{category:'transport', count: 0}, {category:"food", count:0},{category:'utilities', count: 0}, {category:"clothing", count:0}],
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
                recurrExps: state.recurrExps.filter(recurrExp => recurrExp.id !== action.payload.id),
                recurrCatCounts: state.recurrCatCounts.map(
                    (cat) => cat.category === action.payload.category ? {...cat, count: cat.count - 1} : cat
                ),
                recurrCatsInitialized: state.cat === 1 ? false : true,
                cat: state.cat - 1
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