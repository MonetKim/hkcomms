// Third Party
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Utility
import {reducer} from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['showActivityLoader', 'autoLogout'],
};
const middleware = [thunk]

const persistedReducer = persistReducer(persistConfig, reducer);
//, applyMiddleware(logger) for dev true
//const store = __DEV__ ? createStore(persistedReducer, reducer, applyMiddleware(...middleware))  : createStore(persistedReducer, reducer, applyMiddleware(...middleware));
const store =  createStore(persistedReducer,  applyMiddleware(...middleware));
    
const persistor = persistStore(store, null, () => {
  console.log('rehydrated');
});

export {store, persistor};
