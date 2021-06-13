/* eslint-disable @typescript-eslint/no-namespace */
import { UserDTO } from '../types';
import authActions, { IAuthActions } from './actions';
import authReducer from './reducer';

export namespace AuthStore {
  export type IState = {
    login_pending: boolean;
    login_error: string | null;
    logout_pending: boolean;
    logout_error: string | null;
    register_pending: boolean;
    register_error: string | null;
    user: UserDTO | null;
    token: string | null;
    change_password_pending: boolean;
    change_password_error: string | null;
  };

  export const initialState: IState = {
    login_pending: false,
    login_error: null,
    logout_pending: false,
    logout_error: null,
    register_pending: false,
    register_error: null,
    user: null,
    token: null,
    change_password_pending: false,
    change_password_error: null
  };

  export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    LOGOUT = 'LOGOUT',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAILED = 'LOGOUT_FAILED',
    REGISTER = 'REGISTER',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILED = 'REGISTER_FAILED',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'
  }

  export const actions = authActions;
  export const reducer = authReducer;
  export interface IActions extends IAuthActions {}
}
