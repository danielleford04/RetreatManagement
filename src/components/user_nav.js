import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserOverlay from '../containers/user_overlay.js';
import { logout } from '../actions';

class UserNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showUserOverlay: false,
    };
    this.toggleUserOverlay = this.toggleUserOverlay.bind(this);
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logout();
  };

  toggleUserOverlay() {
    this.setState({showUserOverlay: !this.state.showUserOverlay})
  }
  render() {
    const { user, isAuthenticated } = this.props.authentication;
    return(
      <div className="user-nav">
        <a className={"user-name-link" + (!isAuthenticated ? " hidden" : '')} onClick={() => this.setState({ showUserOverlay: true })}>Username</a>
        <Link className="app-name-link" to="/"><img src={"../../style/images/logoHorizontal.png"} height={"35px"} /></Link>
        <Link className={"logout-link" + (!isAuthenticated ? " hidden" : '')} onClick={this.onLogoutClick} to="/login">Logout</Link>
        {this.state.showUserOverlay &&
        <UserOverlay toggleUserOverlay={this.toggleUserOverlay}
        />
      }
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
