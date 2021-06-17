import { Dispatch } from 'redux';
import { AuthStore } from './index';
import { Server } from '../../utils';
import { RegisterUserDTO } from '../types';
import { Alert } from 'react-native';

export interface IAuthActions {
  registerAction(user: RegisterUserDTO): void;
  loginAction(email: string, password: string): void;
  logoutAction(): void;
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
          Alert.alert(
            'Username or password is incorrect!',
            'Please provide a valid email and password combination',
            [{ text: 'OK' }]
          );
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
}

const authActions = new AuthActions();
export default authActions;
