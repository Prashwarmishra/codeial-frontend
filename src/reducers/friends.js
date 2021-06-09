import {
  ADD_FRIEND,
  FETCH_USER_FRIENDS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';
const initialFriendsState = [];

export default function friends(state = initialFriendsState, action) {
  switch (action.type) {
    case FETCH_USER_FRIENDS:
      return action.friends;
    case ADD_FRIEND:
      return state.concat(action.friend);
    case REMOVE_FRIEND:
      const friends = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return friends;
    default:
      return state;
  }
}
