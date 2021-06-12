import {
  ADD_COMMENT,
  ADD_POST,
  COMMENT_LIKE,
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
          // post.likes.push(action.userId);
        }
        return post;
      });
      return newLikedPost;
    case COMMENT_LIKE:
      const newLikedComment = state.map((post) => {
        if (post._id === action.postId) {
          const newComment = post.comments.map((comment) => {
            if (comment._id === action.commentId) {
              return {
                ...comment,
                likes: [...comment.likes, action.userId],
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: newComment,
          };
        }
        return post;
      });
      return newLikedComment;
    default:
      return state;
  }
}
