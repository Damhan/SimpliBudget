import {combineReducers} from 'redux';
import balReducer from './balReducer';
import expReducer from './expReducer';
import recurrExpReducer from './recurrExpReducer';

export default combineReducers({
    bal: balReducer,
    expR: expReducer,
    recurrExpR: recurrExpReducer
})