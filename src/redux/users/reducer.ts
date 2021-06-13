import { IAction } from '../types';
import { UserStore } from './index';

function userReducer(
  state: UserStore.IState = UserStore.initialState,
  action: any
): UserStore.IState {
  switch (action.type) {
    case UserStore.ActionTypes.EDIT_USER: {
      return {
        ...state,
        edit_user_pending: true,
        edit_user_error: null
      };
    }
    case UserStore.ActionTypes.EDIT_USER_SUCCESS: {
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
