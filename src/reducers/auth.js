import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        isLoggedin: true,
        inProgress: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return state;
  }
}
