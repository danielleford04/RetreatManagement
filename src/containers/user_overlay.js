import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultEditor from '../containers/default_editor.js';
import SetDefaultsControl from '../components/set_defaults_control.js';
import ConfirmationEmailEditor from '../components/confirmation_email_editor';
import { createEvent, verifyEmail } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class UserOverlay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showVerifyEmail: false,
            emailFromInput: ''
        };
        this.toggleVerifyEmail = this.toggleVerifyEmail.bind(this);
    }
stopPropagation(e) {
   e.stopPropagation();
 };

    toggleVerifyEmail() {
        this.setState({showVerifyEmail: !this.state.showVerifyEmail})
    }

    handleChange(e) {
        this.setState({ emailFromInput: e.target.value });
    }

    verifyEmail() {
        let values = {email: this.state.emailFromInput}
        this.props.verifyEmail(values, () => {
                // this.setState({ showSuccessModal: true })
                console.log('success')
            },

            () => {
                // this.setState({ showErrorModal: true })
                console.log('error')
            });
    }


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
                <div> Name: {this.props.user.first_name} {this.props.user.last_name ? this.props.user.last_name : ''} </div>

              <div>
                  <div className="form-group row">
                      <div className="col-sm-8">
                      Emails sent from: {this.props.user.email}
                      </div>
                      <div className="col-sm-4">
                      <button type="button" className="btn btn-secondary" onClick={this.toggleVerifyEmail}>Change Sender Email</button>
                      </div>
                  </div>
                  { this.state.showVerifyEmail ?
                      <div>
                      <h6>All "send from" emails have to be verified. If your email address hasn't been previously verified, you will receive an email
                      from Amazon asking you to verify the email. You do so by clicking the link in the email. Emails will only be able to be sent if a
                          verified email is on file for your account.</h6>
                      <div className="form-group row">
                          <label className="col-sm-2 col-form-label">Email:</label>
                          <div className="col-sm-8">
                              <input type="text" className="form-control" value={this.state.emailFromInput} onChange={ this.handleChange.bind(this) } />
                          </div>
                          <div className="col-sm-2">
                            <button type="button" className="btn btn-primary" onClick={this.verifyEmail.bind(this)}>Save</button>
                          </div>
                      </div>
                  </div>
                      : null }
              </div>
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
    mapStateToProps, { createEvent, verifyEmail }
)(UserOverlay);
