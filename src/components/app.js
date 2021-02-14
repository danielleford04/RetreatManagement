import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainContent from '../components/main_content.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserNav from '../components/user_nav.js';
import Login from '../components/login.js';
import PrivateRoute from '../components/private_route.js';
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../global/utilities.js";
import {setCurrentUser, logout, fetchUserData} from "../actions";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faTimes, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp, faAngleDown, faTimes, faPlusCircle, faTimesCircle)


class App extends Component {
componentDidMount() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        this.props.setCurrentUser(decoded);
        this.props.fetchUserData(decoded.id);
// Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            // Logout user
            this.props.logout();
            // Redirect to login
            window.location.href = "./login";
        }
    }
}

  render() {
    return (
      <BrowserRouter>
        <div>
          <UserNav />
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={MainContent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(null, { setCurrentUser, logout, fetchUserData })(App)
