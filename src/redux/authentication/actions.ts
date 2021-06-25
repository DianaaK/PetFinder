import { Dispatch } from 'redux';
import Toast from 'react-native-toast-message';
import { AuthStore } from './index';
import { Server } from '../../utils';
import { RegisterUserDTO } from '../types';

export interface IAuthActions {
  registerAction(user: RegisterUserDTO): void;
  loginAction(email: string, password: string): void;
  logoutAction(): void;
  changePasswordAction(
    username: string,
    oldPassword: string,
    newPassword: string
  ): void;
}

class AuthActions implements IAuthActions {
  registerAction(user: RegisterUserDTO) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthStore.ActionTypes.REGISTER
      });
      Server.post('auth/register', user)
        .then((user: any) => {
          dispatch({
            type: AuthStore.ActionTypes.REGISTER_SUCCESS
          });
          dispatch(
            AuthStore.actions.loginAction(user.data.email, user.data.password)
          );
        })
        .catch((error) => {
          if (
            Server.errorParse(error) &&
            Server.errorParse(error).name === 'UserExistsError'
          ) {
            Toast.show({
              type: 'error',
              text1: 'An account with this email address already exists!',
              visibilityTime: 2500
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Due to an error, the account could not be created!',
              visibilityTime: 2500
            });
          }
          dispatch({
            type: AuthStore.ActionTypes.REGISTER_FAILED,
            payload: error
          });
        });
    };
  }

  loginAction(email: string, password: string) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthStore.ActionTypes.LOGIN
      });
      return Server.login({ username: email, password: password })
        .then(async (user) => {
          dispatch({
            type: AuthStore.ActionTypes.LOGIN_SUCCESS,
            payload: user
          });
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            topOffset: 50,
            text1: 'Username or password is incorrect!',
            text2: 'Please provide a valid email and password combination.'
          });
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

  changePasswordAction(
    username: string,
    oldPassword: string,
    newPassword: string
  ) {
    return (dispatch: Dispatch<any>) => {
      dispatch({
        type: AuthStore.ActionTypes.CHANGE_PASSWORD
      });
      Server.post('auth/change-password', {
        username,
        password: oldPassword,
        newPassword
      })
        .then((response: any) => {
          dispatch({
            type: AuthStore.ActionTypes.CHANGE_PASSWORD_SUCCESS,
            payload: response.data
          });
          Toast.show({
            type: 'success',
            text1: 'Password changed successfully!',
            visibilityTime: 2500
          });
        })
        .catch((error) => {
          dispatch({
            type: AuthStore.ActionTypes.CHANGE_PASSWORD_FAILED,
            payload: error
          });
          Toast.show({
            type: 'error',
            text1: 'Incorrect old password!',
            visibilityTime: 2500
          });
        });
    };
  }
}

const authActions = new AuthActions();
export default authActions;
