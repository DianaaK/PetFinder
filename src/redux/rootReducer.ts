import {combineReducers} from 'redux';
import {ActionConst, Reducer} from 'react-native-router-flux';
import {store} from './store';

import sceneReducer from './scenes/reducer';

export const initSceneReducer = (params: any) => {
  const defaultReducer = new Reducer(params);
  return (state: any, action: any) => {
    // if (action.type === ActionConst.FOCUS) {
    //   store.dispatch({
    //     type: 'CHANGE_SCENE',
    //     payload: action,
    //   });
    // }
    return defaultReducer(state, action);
  };
};

const rootReducer = combineReducers({
  scene: sceneReducer,
  // auth: authReducer,
  // appConfig: appConfigReducer,
  // notifications: notificationsReducer,
  // settings: settingsReducer,
  // photo: photoReducer,
  // animation: animationReducer
});

const appReducer = (state: any, action: any) => {
  // if (action.type === 'USER_LOGOUT') {
  //   if (state && state.appConfig) {
  //     const persistState = {appConfig: state.appConfig};
  //     state = persistState;
  //   }
  // }
  return rootReducer(state, action);
};

export default appReducer;
