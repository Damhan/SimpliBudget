import {combineReducers} from 'redux';
import balReducer from './balReducer';
import expReducer from './expReducer';

export default combineReducers({
    bal: balReducer,
    expR: expReducer
})