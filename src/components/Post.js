import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({
      content: e.target.value,
    });
  };

  handleAddComment = (e) => {
    if (e.target.value === 'Enter') {
      //   const { content } = this.state;
    }
  };

  render() {
    const { post } = this.props;
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
            <div className="post-like">
              <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
              <span>{post.likes.length}</span>
            </div>

            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input placeholder="Start typing a comment" />
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

export default Post;
