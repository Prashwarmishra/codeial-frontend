import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/profile';

class Userprofile extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    console.log(userId);
    this.props.dispatch(getUserProfile(userId));
  }

  render() {
    const { user, inProgress } = this.props.profile;
    if (inProgress) {
      return <h3>Updating...</h3>;
    }
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
          <button className="btn save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStateToProps)(Userprofile);
