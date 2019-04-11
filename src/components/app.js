import React, { Component } from 'react';
import MainContent from '../components/main_content.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserNav from '../components/user_nav.js';
import Login from '../components/login.js';
import PrivateRoute from '../components/private_route.js';

import jwt_decode from "jwt-decode";
import { setAuthToken } from "../global/utilities.js";
import { setCurrentUser, logoutUser } from "../actions";

export default class App extends Component {
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
