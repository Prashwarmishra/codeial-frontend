import { APIUrls } from '../helpers/urls';
import {
  getAuthTokenFromLocalStorage,
  getFormBody,
  setAuthTokeninLocalStorage,
} from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_SUCCESS,
} from './actionTypes';

//login

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
          setAuthTokeninLocalStorage(data.data.token);
          return dispatch(loginSuccess(data.data.user));
        }
        return dispatch(loginFailure(data.message));
      });
  };
}

//sign-up

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupError(errorMessage) {
  return {
    type: SIGNUP_FAILURE,
    error: errorMessage,
  };
}

export function signup(name, email, password, confirmPassword) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
      },
      body: getFormBody({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          return dispatch(signupSuccess(data.data.user));
        }
        return dispatch(signupError(data.message));
      });
  };
}

//user authentication
export function userAuthentication(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

//logout
export function logout() {
  return {
    type: LOG_OUT,
  };
}

//clear errors
export function clearAuth() {
  return {
    type: CLEAR_AUTH,
  };
}

//edit
export function userEditSuccess(user) {
  return {
    type: USER_EDIT_SUCCESS,
    user,
  };
}

export function userEditFailure(error) {
  return {
    type: USER_EDIT_FAILURE,
    error,
  };
}

export function userEdit(name, password, confirmPassword, id) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return dispatch(userEditSuccess(data.data.user));
        }
        return dispatch(userEditFailure(data.message));
      });
  };
}
