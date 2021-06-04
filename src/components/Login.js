import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

  // handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Email value: ', this.emailInputRef);
  //   console.log('Password value: ', this.passwordInputRef);
  // };

  handleEmailInput = (e) => {
    const email = e.target.value;
    this.setState({
      email,
    });
  };

  handlePasswordInput = (e) => {
    const password = e.target.value;
    this.setState({
      password,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log('Email: ', email, 'Password: ', password);
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailInput}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordInput}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}
