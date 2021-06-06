import { ActionDTO } from '../types';
import { AuthStore } from './index';

function authReducer(
  state: AuthStore.IState = AuthStore.initialState,
  action: ActionDTO<any>
): AuthStore.IState {
  switch (action.type) {
    case AuthStore.ActionTypes.LOGIN: {
      return {
        ...state,
        login_pending: true,
        login_error: null
      };
    }
    case AuthStore.ActionTypes.LOGIN_SUCCESS: {
      const nextState = {
        ...state,
        login_pending: false,
        login_error: null,
        user: action.payload.user,
        token: action.payload.token
      };
      return nextState;
    }
    case AuthStore.ActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        login_pending: false,
        user: null,
        token: null,
        login_error: action.payload
      };
    }
    case AuthStore.ActionTypes.LOGOUT: {
      return {
        login_pending: false,
        login_error: null,
        logout_pending: false,
        logout_error: null,
        register_pending: false,
        register_error: null,
        user: null,
        token: null,
        edit_user_pending: false,
        edit_user_error: null,
        change_password_pending: false,
        change_password_error: null
      };
    }
    case AuthStore.ActionTypes.EDIT_USER: {
      return {
        ...state,
        edit_user_pending: true,
        edit_user_error: null
      };
    }
    case AuthStore.ActionTypes.EDIT_USER_SUCCESS: {
      const newUserData = action.payload;
      const currentStateUser = state.user;
      const editedUser = {
        ...currentStateUser,
        _id: currentStateUser?._id || '',
        email: newUserData.email,
        firstname: newUserData.firstname,
        lastname: newUserData.lastname,
        phone: newUserData.phone
      };
      const nextState = {
        ...state,
        user: editedUser,
        edit_user_pending: false,
        edit_user_error: null
      };
      return nextState;
    }
    case AuthStore.ActionTypes.EDIT_USER_FAILED: {
      return {
        ...state,
        edit_user_pending: false,
        edit_user_error: action.payload
      };
    }
    default:
      return state;
  }
}

export default authReducer;
