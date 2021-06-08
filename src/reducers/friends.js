import { FETCH_USER_FRIENDS } from '../actions/actionTypes';
const initialFriendsState = [];

export default function friends(state = initialFriendsState, action) {
  switch (action.type) {
    case FETCH_USER_FRIENDS:
      return action.friends;
    default:
      return state;
  }
}
