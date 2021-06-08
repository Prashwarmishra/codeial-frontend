import React from 'react';
import { Link } from 'react-router-dom';

function FriendsListItem(props) {
  const { friend } = props;
  return (
    <div>
      <Link className="friends-item" to={`/user/${friend._id}`}>
        <div className="friends-img">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="friends-name">{friend.name}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
