import {combineReducers} from 'redux';
import balReducer from './balReducer';

export default combineReducers({
    bal: balReducer 
})