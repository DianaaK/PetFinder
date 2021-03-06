import axios, { AxiosRequestConfig, Method } from 'axios';
import { store, AuthStore } from '../redux';

const defOrigin = 'https://pet-finder-licenta.herokuapp.com';

class Server {
  origin?: string;
  token?: string;
  constructor() {
    this.origin = defOrigin;
  }

  get(url: string, data: any = null) {
    return this.call('get', url, data);
  }

  post(url: string, data: any) {
    return this.call('post', url, data);
  }

  put(url: string, data: any) {
    return this.call('put', url, data);
  }

  delete(url: string, data?: any) {
    return this.call('delete', url, data);
  }

  login(user: { username: string; password: string }) {
    return this.post('auth/login', user)
      .then((user: any) => {
        this.setToken(user.data.token);
        return user.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  logout() {
    return this.get(`auth/logout`)
      .then((response) => {
        this.removeToken();
        return response;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  call(method: Method, url: string, data: any) {
    const axiosRequest = this.getMetadata(method, url, data);
    return new Promise((resolve, reject) => {
      axios
        .request(axiosRequest)
        .then((result: any) => resolve(result))
        .catch((err: any) => {
          const parsedError = this.handleError(err);
          if (parsedError) {
            reject(parsedError);
          } else {
          }
        });
    });
  }

  getMetadata(method: Method, url: string, data: any) {
    const state = store.getState();
    let token = '';
    if (state && state.auth && state.auth && state.auth.token) {
      token = state.auth.token;
    }
    let axiosRequest: AxiosRequestConfig = {};
    axiosRequest = {
      baseURL: `${this.origin}/${url}`,
      method,
      data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axiosRequest;
  }

  handleError(err: any) {
    const { response } = err;
    if (!response) {
      console.warn('Server error', err);
      return err;
    }
    const { data } = err.response;
    if (
      data.message === 'jwt expired' ||
      data.message === 'invalid signature'
    ) {
      store.dispatch({ type: AuthStore.ActionTypes.LOGOUT });
      return null;
    }
    return err;
  }

  errorParse(error: any) {
    const response = error?.response || error || {};
    const data = response.data || response;
    return data.ERROR || data;
  }

  setToken(token: string) {
    this.token = token;
  }

  removeToken() {
    this.token = undefined;
  }
}

export default new Server();
