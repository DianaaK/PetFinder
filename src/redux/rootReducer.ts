import { combineReducers } from 'redux';
import { AuthStore } from './authentication';

export const rootReducer = combineReducers({
  auth: AuthStore.reducer
  // appConfig: appConfigReducer,
  // notifications: notificationsReducer,
  // settings: settingsReducer,
  // photo: photoReducer,
  // animation: animationReducer
});

export const appReducer = (state: any, action: any) => {
  // if (action.type === 'USER_LOGOUT') {
  //   if (state && state.appConfig) {
  //     const persistState = {appConfig: state.appConfig};
  //     state = persistState;
  //   }
  // }
  return rootReducer(state, action);
};

export namespace AppStore {
  export type states = {
    auth: AuthStore.IState;
  };
}
