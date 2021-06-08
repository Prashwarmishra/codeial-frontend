import React, { Component } from 'react';

export default class Userprofile extends Component {
  render() {
    const {
      match: { params },
    } = this.props;
    console.log('user props: ', params);
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
          <div className="field-value">some name</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">somebody@email.com</div>
        </div>

        <div className="btn-grp">
          <button className="btn save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}
