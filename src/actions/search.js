import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { USER_SEARCH_SUCCESS } from './actionTypes';

export function userSearchSuccess(users) {
  return {
    type: USER_SEARCH_SUCCESS,
    users,
  };
}

export function fetchSearchResults(searchText) {
  return (dispatch) => {
    const url = APIUrls.searchUsers(searchText);
    fetch(url, {
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('search data: ', data);
        if (data.success) {
          return dispatch(userSearchSuccess(data.data.users));
        }
        return dispatch(userSearchSuccess([]));
      });
  };
}
