import {GET_BAL} from './../actions/types';

//Adding some static data to our reducers state.
const initialState = {
    balance: 100
}

export default function(state=initialState, action) {
    switch(action.type) {
        //CASE FOR WHEN ACTION is GET_BAL
        //Spred operator returns what is in state.
        case GET_BAL:
            return {
                ...state
            }
        default:
            return state;
    }
}