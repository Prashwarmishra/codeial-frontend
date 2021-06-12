import {
  ADD_COMMENT,
  ADD_POST,
  COMMENT_LIKE,
  POST_LIKE,
  UPDATE_POSTS,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data: ', data);
        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function createComment(comment, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        comment,
        post_id: postId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data: ', data);
        if (data.success) {
          dispatch(addComment(data.data.content, postId));
        }
      });
  };
}

export function postLike(postId, userId) {
  return {
    type: POST_LIKE,
    postId,
    userId,
  };
}

export function commentLike(commentId, userId, postId) {
  return {
    type: COMMENT_LIKE,
    commentId,
    userId,
    postId,
  };
}

export function toggleLike(likeableType, likeableId, userId, parentId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(likeableType, likeableId);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('like data', data);
        if (data.success) {
          if (likeableType === 'Post') {
            dispatch(postLike(likeableId, userId));
          } else {
            dispatch(commentLike(likeableId, userId, parentId));
          }
        }
      });
  };
}
