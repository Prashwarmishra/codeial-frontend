import React from 'react';
import FriendsListItem from './FriendsListItem';

function FriendsList(props) {
  const { friends } = props;
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {friends && friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {friends &&
        friends.map((friend) => {
          return <FriendsListItem friend={friend.to_user} key={friend._id} />;
        })}
    </div>
  );
}

export default FriendsList;
