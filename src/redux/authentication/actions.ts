import { Dispatch } from 'redux';
import { AuthStore } from './';
import { Server } from '../../utils';

/*
  IAuthActions interface definition, which contains every redux action asociated with Auth State.
*/
export interface IAuthActions {
  loginAction(email: string, password: string, player_id: string): any;
  logoutAction(player_id: string): any;
  editProfileAction(user: any): any;
}

/*
  class AuthActions that implements redux actions defined in IAuthActions interface
*/
class AuthActions implements IAuthActions {
  loginAction(email: string, password: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthStore.ActionTypes.LOGIN
      });
      return Server.login(email, password)
        .then(async (user) => {
          dispatch({
            type: AuthStore.ActionTypes.LOGIN_SUCCESS,
            payload: user
          });
        })
        .catch((error) => {
          dispatch({
            type: AuthStore.ActionTypes.LOGIN_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }

  logoutAction() {
    return (dispatch: Dispatch<any>) => {
      Server.logout().then(() => {
        dispatch({ type: AuthStore.ActionTypes.LOGOUT });
      });
    };
  }

  editProfileAction(user: any) {
    return async (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthStore.ActionTypes.EDIT_USER
      });
      await Server.put(`users/${user._id}`, user)
        .then((response: any) => {
          dispatch({
            type: AuthStore.ActionTypes.EDIT_USER_SUCCESS,
            payload: response.data as any
          });
        })
        .catch((error) => {
          dispatch({
            type: AuthStore.ActionTypes.EDIT_USER_FAILED,
            payload: Server.errorParse(error)
          });
        });
    };
  }
}

const authActions = new AuthActions();
export default authActions;
