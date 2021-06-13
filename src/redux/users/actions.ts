import { Dispatch } from 'redux';
import { UserStore } from './index';
import { Server } from '../../utils';

export interface IUserActions {
  editProfileAction(user: any): any;
}

class UserActions implements IUserActions {
  editProfileAction(user: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserStore.ActionTypes.EDIT_USER
      });
      await Server.put(`users/${user._id}`, user)
        .then((response: any) => {
          dispatch({
            type: UserStore.ActionTypes.EDIT_USER_SUCCESS,
            payload: response.data as any
          });
        })
        .catch((error) => {
          dispatch({
            type: UserStore.ActionTypes.EDIT_USER_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const userActions = new UserActions();
export default userActions;
