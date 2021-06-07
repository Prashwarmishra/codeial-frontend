import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup, clearAuth } from '../actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState({
      name,
    });
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState({
      email,
    });
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    console.log('password', password);
    this.setState({
      password,
    });
  };
  handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    console.log('confirm password', confirmPassword);
    this.setState({
      confirmPassword,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (name && email && password && confirmPassword) {
      this.props.dispatch(signup(name, email, password, confirmPassword));
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    // const { from } = this.props.location.state || { from: '/' };
    if (isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={this.handleNameChange}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={this.handleConfirmPasswordChange}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Signing Up...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Signup);
