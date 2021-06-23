import { AuthStore } from './index';

function authReducer(
  state: AuthStore.IState = AuthStore.initialState,
  action: any
): AuthStore.IState {
  switch (action.type) {
    case AuthStore.ActionTypes.REGISTER: {
      return {
        ...state,
        register_pending: true,
        register_error: null
      };
    }
    case AuthStore.ActionTypes.REGISTER_SUCCESS: {
      const nextState = {
        ...state,
        register_pending: false,
        register_error: null
      };
      return nextState;
    }
    case AuthStore.ActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        register_pending: false,
        register_error: action.payload
      };
    }
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
        auth_user: action.payload.user,
        token: action.payload.token
      };
      return nextState;
    }
    case AuthStore.ActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        login_pending: false,
        auth_user: null,
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
        auth_user: null,
        token: null,
        change_password_pending: false,
        change_password_error: null
      };
    }
    case AuthStore.ActionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        change_password_pending: true,
        change_password_error: null
      };
    }
    case AuthStore.ActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        change_password_pending: false,
        change_password_error: null
      };
    }
    case AuthStore.ActionTypes.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        change_password_pending: false,
        change_password_error: action.payload
      };
    }
    default:
      return state;
  }
}

export default authReducer;
