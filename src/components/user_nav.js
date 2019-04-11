import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';

class UserNav extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { user } = this.props.authentication;
    return(
      <div className="user-nav">
        <Link className="user-name-link" to="/instructions">Username</Link>
        <Link className="app-name-link" to="/">App name</Link>
        <Link className="logout-link" onClick={this.onLogoutClick} to="/login">Logout</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authentication: state.authentication
});
export default connect(
  mapStateToProps,
  { logout }
)(UserNav);
