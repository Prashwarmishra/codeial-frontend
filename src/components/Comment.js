import React from 'react';
import { connect } from 'react-redux';
import { toggleLike } from '../actions/posts';

function Comment({ comment, postId, dispatch, user }) {
  function handleCommentLike() {
    dispatch(toggleLike('Comment', comment._id, user._id, postId));
  }
  const isCommentLiked = comment.likes.includes(user._id);
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        <span className="post-comment-like-icon" onClick={handleCommentLike}>
          {isCommentLiked ? (
            <img
              src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
              alt="like-icon"
            />
          ) : (
            <img
              src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
              alt="unlike-icon"
            />
          )}
        </span>
        <span className="post-comment-likes">{comment.likes.length}</span>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Comment);
