import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authentication, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authentication.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  authentication: state.authentication
});
export default connect(mapStateToProps)(PrivateRoute);
