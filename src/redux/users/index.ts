/* eslint-disable @typescript-eslint/no-namespace */
import { UserDTO } from '../types';
import userActions, { IUserActions } from './actions';
import userReducer from './reducer';

export namespace UserStore {
  export type IState = {
    user: UserDTO | null;
    get_user_pending: boolean;
    get_user_error: string | null;
    edit_user_pending: boolean;
    edit_user_error: string | null;
  };

  export const initialState: IState = {
    user: null,
    get_user_pending: false,
    get_user_error: null,
    edit_user_pending: false,
    edit_user_error: null
  };

  export enum ActionTypes {
    GET_USER = 'GET_USER',
    GET_USER_SUCCESS = 'GET_USER_SUCCESS',
    GET_USER_FAILED = 'GET_USER_FAILED',
    EDIT_USER = 'EDIT_USER',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED = 'EDIT_USER_FAILED'
  }

  export const actions = userActions;
  export const reducer = userReducer;
  export interface IActions extends IUserActions {}
}
