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

import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';
import { fetchPosts } from '../actions/posts';
import { userAuthentication } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { getUserFriends } from '../actions/friends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, component: Component, path } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    ></Route>
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        userAuthentication({
          name: user.name,
          _id: user._id,
          email: user.email,
        })
      );
      this.props.dispatch(getUserFriends());
    }
  }

  render() {
    console.log('PROPS', this.props);
    const { posts, auth, friends } = this.props;

    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    posts={posts}
                    {...props}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            ></PrivateRoute>
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
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
