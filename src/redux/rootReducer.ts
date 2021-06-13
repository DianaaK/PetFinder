import { combineReducers, Reducer } from 'redux';
import { AuthStore } from './authentication';
import authReducer from './authentication/reducer';
import { UserStore } from './users';
import userReducer from './users/reducer';

export const rootReducer: Reducer<any> = combineReducers({
  auth: authReducer,
  user: userReducer
});

export const appReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state.users = undefined;
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
    user: UserStore.IState;
  };
}
