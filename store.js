import {createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWare = [thunk];

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(
    applyMiddleware(...middleWare)
));

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

export {getPersistor ,getState, getStore}

export default {getPersistor ,getState, getStore}; 