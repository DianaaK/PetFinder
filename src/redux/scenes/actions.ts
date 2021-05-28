import { ActionTypes } from "./store";

class SceneActions {
  changeAction = (scene: any) => (dispatch: any) => {
    dispatch({
      type: ActionTypes.CHANGE_SCENE,
      payload: {
        route: scene.routeName,
        params: scene.params
      }
    });
  };
}

const sceneActions = new SceneActions();
export default sceneActions;
