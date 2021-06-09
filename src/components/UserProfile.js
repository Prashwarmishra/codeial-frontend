import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { getUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    console.log(userId);
    this.props.dispatch(getUserProfile(userId));
  }

  checkFriendship = () => {
    const { match, friends } = this.props;
    const { userId } = match.params;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const { userId } = this.props.match.params;
    const url = APIUrls.addFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.props.dispatch(addFriend(data.data.friendship));
      this.setState({
        success: true,
        error: null,
        successMessage: data.message,
      });
    } else {
      this.setState({
        error: data.message,
        success: null,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { match } = this.props;
    const { userId } = match.params;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.props.dispatch(removeFriend(userId));
      this.setState({
        success: true,
        successMessage: data.message,
        error: null,
      });
    } else {
      this.setState({
        success: null,
        successMessage: null,
        error: data.message,
      });
    }
  };

  render() {
    const { user, inProgress } = this.props.profile;
    const isFriend = this.checkFriendship();
    if (inProgress) {
      return <h3>Updating...</h3>;
    }
    const { success, error, successMessage } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {isFriend ? (
            <button
              className="btn save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          ) : (
            <button
              className="btn save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          )}
        </div>

        {success && (
          <div className="alert success-dailog">{successMessage}</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(Userprofile);
