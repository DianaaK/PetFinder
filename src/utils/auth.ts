import { store } from '../redux/store';

class AuthUtil {
  isLogged = () => {
    const state = store.getState();
    if (state.auth && state.auth.auth_user && state.auth.token) {
      return true;
    }
    return false;
  };
}

export default new AuthUtil();
