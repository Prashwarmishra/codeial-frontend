import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createComment, toggleLike } from '../actions/posts';
// import {connect} from 'react-redux';
import { Comment } from './';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleCommentChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      content: e.target.value,
    });
  };

  handleAddComment = (e) => {
    // console.log('Key pressed: ', e.key);
    if (e.key === 'Enter') {
      const { content } = this.state;
      const postId = this.props.post._id;
      this.props.dispatch(createComment(content, postId));
      this.setState({ content: '' });
    }
  };

  handlePostLike = () => {
    const { user, dispatch, post } = this.props;
    dispatch(toggleLike('Post', post._id, user._id));
  };

  render() {
    const { post, user } = this.props;
    const isPostLiked = post.likes.includes(user._id);
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLiked ? (
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
              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleCommentChange}
              onKeyPress={this.handleAddComment}
              value={this.state.content}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
