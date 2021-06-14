import { combineReducers, Reducer } from 'redux';
import authReducer from './authentication/reducer';
import petReportReducer from './pet-reports/reducer';
import userReducer from './users/reducer';
import { AuthStore } from './authentication';
import { PetReportStore } from './pet-reports';
import { UserStore } from './users';

export const rootReducer: Reducer<any> = combineReducers({
  auth: authReducer,
  petReports: petReportReducer,
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
    petReports: PetReportStore.IState;
  };
}
