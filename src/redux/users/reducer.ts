import { UserStore } from './index';

function userReducer(
  state: UserStore.IState = UserStore.initialState,
  action: any
): UserStore.IState {
  switch (action.type) {
    case UserStore.ActionTypes.GET_USER: {
      return {
        ...state,
        get_user_pending: true,
        get_user_error: null
      };
    }
    case UserStore.ActionTypes.GET_USER_SUCCESS: {
      const nextState = {
        ...state,
        user: action.payload,
        get_user_pending: false,
        get_user_error: null
      };
      return nextState;
    }
    case UserStore.ActionTypes.GET_USER_FAILED: {
      return {
        ...state,
        get_user_pending: false,
        get_user_error: action.payload
      };
    }
    case UserStore.ActionTypes.EDIT_USER: {
      return {
        ...state,
        edit_user_pending: true,
        edit_user_error: null
      };
    }
    case UserStore.ActionTypes.EDIT_USER_SUCCESS: {
      const nextState = {
        ...state,
        user: action.payload,
        edit_user_pending: false,
        edit_user_error: null
      };
      return nextState;
    }
    case UserStore.ActionTypes.EDIT_USER_FAILED: {
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

export default userReducer;
