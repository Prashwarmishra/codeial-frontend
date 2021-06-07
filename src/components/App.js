import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Home, Navbar, Page404, Login, Signup, Settings } from './';

import { fetchPosts } from '../actions/posts';
import { userAuthentication } from '../actions/auth';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, component: Component, path } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component props={props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        userAuthentication({
          name: user.name,
          _id: user._id,
          email: user.email,
        })
      );
    }
  }

  render() {
    console.log('PROPS', this.props);
    const { posts, auth } = this.props;

    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home posts={posts} {...props} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
