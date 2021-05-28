import {ActionTypes, initialState} from './store';

function sceneReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.CHANGE_SCENE: {
      return {
        ...state,
        scene: action.payload,
      };
    }
    default:
      return state;
  }
}

export default sceneReducer;
