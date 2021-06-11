import {
  ADD_COMMENT,
  ADD_POST,
  POST_LIKE,
  UPDATE_POSTS,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPost = state.map((post) => {
        if (post._id === action.postId) {
          post.comments.prepend(action.comment);
        }
        return post;
      });
      return newPost;
    case POST_LIKE:
      const newLikedPost = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return newLikedPost;
    default:
      return state;
  }
}
