import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return <div className="App">App</div>;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
