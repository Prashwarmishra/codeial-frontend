import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { ADD_FRIEND, FETCH_USER_FRIENDS, REMOVE_FRIEND } from './actionTypes';

export function fetchUserFriends(friends) {
  return {
    type: FETCH_USER_FRIENDS,
    friends,
  };
}

export function getUserFriends() {
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          return dispatch(fetchUserFriends(data.data.friends));
        }
      });
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
