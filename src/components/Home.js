import React, { Component } from 'react';
import { PostsList, FriendsList } from './';

export default class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div id="main-wrapper">
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
      </div>
    );
  }
}
