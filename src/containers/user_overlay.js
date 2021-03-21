import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultEditor from '../containers/default_editor.js';
import SetDefaultsControl from '../components/set_defaults_control.js';
import ConfirmationEmailEditor from '../components/confirmation_email_editor';
import { createEvent } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class UserOverlay extends Component {
stopPropagation(e) {
   e.stopPropagation();
 };

  render() {
    // console.log('user-overlay-props',this.props)
    return(

      <div className="overlay-container" onClick={this.props.toggleUserOverlay}>
        <div className="overlay" onClick={this.stopPropagation} >
          <div className="jumbotron">
          <FontAwesomeIcon icon="times" className="close-icon" onClick={this.props.toggleUserOverlay} />
            <div className="user-settings">
              <h4> Settings </h4>
              <div>
                <div> Name: {this.props.user.first_name} {this.props.user.last_name ? this.props.user.last_name : ''} <br/>
                Emails sent from: {this.props.user.email}</div>
                  { this.props.user.defaults.length < 3 &&
                      <SetDefaultsControl defaults={this.props.user.defaults}/>
                  }
              </div>
            </div>
              { this.props.user.defaults.length > 0 &&
                <DefaultEditor defaults={this.props.user.defaults} selectedDefault={this.props.user.defaults[0]}/>
              }
            </div>

          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
    mapStateToProps, { createEvent }
)(UserOverlay);
