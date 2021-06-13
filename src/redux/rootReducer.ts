import { combineReducers, Reducer } from 'redux';
import { AuthStore } from './authentication';
import authReducer from './authentication/reducer';

export const rootReducer: Reducer<any> = combineReducers({
  auth: authReducer
});

export const appReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    if (state && state.appConfig) {
      const persistState = { appConfig: state.appConfig };
      state = persistState;
    }
  }
  return rootReducer(state, action);
};

export namespace AppStore {
  export type states = {
    auth: AuthStore.IState;
  };
}
