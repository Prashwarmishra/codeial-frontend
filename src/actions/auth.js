import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailure(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    error: errorMessage,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data::', data);
        if (data.success) {
          return dispatch(loginSuccess(data.data.user));
        }
        return dispatch(loginFailure(data.message));
      });
  };
}