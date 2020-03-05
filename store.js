import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWare = [thunk];

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleWare)
));

export default store; 