import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './actionTypes';

export function fetchUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function getUserProfile(userId) {
  return (dispatch) => {
    dispatch(fetchUserProfile());
    const url = APIUrls.userProfile(userId);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('profile info', data);
        if (data.success) {
          return dispatch(userProfileSuccess(data.data.user));
        }
        return dispatch(userProfileFailure(data.message));
      });
  };
}
