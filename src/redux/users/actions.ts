import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';
import { UserStore } from './index';
import { Server } from '../../utils';

export interface IUserActions {
  getUserAction(userId: string): void;
  editUserAction(userId: string, newUser: any): void;
}

class UserActions implements IUserActions {
  getUserAction(userId: string) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserStore.ActionTypes.EDIT_USER
      });
      await Server.get(`users/${userId}`)
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

  editUserAction(userId: string, newUser: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: UserStore.ActionTypes.EDIT_USER
      });
      await Server.put(`users/${userId}`, newUser)
        .then((response: any) => {
          dispatch({
            type: UserStore.ActionTypes.EDIT_USER_SUCCESS,
            payload: response.data as any
          });
          Toast.show({
            type: 'success',
            text1: 'User edited successfully!',
            visibilityTime: 2500
          });
        })
        .catch((error) => {
          dispatch({
            type: UserStore.ActionTypes.EDIT_USER_FAILED,
            payload: Server.errorParse(error)
          });
          Toast.show({
            type: 'error',
            text1: 'The user could not be edited!',
            visibilityTime: 2500
          });
        });
    };
  }
}

const userActions = new UserActions();
export default userActions;
