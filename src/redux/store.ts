import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { appReducer, rootReducer } from './rootReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'appConfig']
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = compose;

export const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// export const persistor = persistStore(store);
