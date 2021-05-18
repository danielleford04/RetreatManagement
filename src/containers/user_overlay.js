import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultEditor from '../containers/default_editor.js';
import SetDefaultsControl from '../components/set_defaults_control.js';
import ConfirmationEmailEditor from '../components/confirmation_email_editor';
import { createEvent, verifyEmail, checkEmailVerificationStatus } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from "sweetalert2-react";


class UserOverlay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showVerifyEmail: false,
            emailFromInput: '',
            emailSubmittedForVerification: '',
            intervalActive: false,
            intervalId: null,
            showSuccessModal: false,
            showErrorModal: false
        };
        this.toggleVerifyEmail = this.toggleVerifyEmail.bind(this);
    }

    stopPropagation(e) {
       e.stopPropagation();
     };

    componentDidMount() {
        if (this.props.user.sender_email_pending) {
            let values = {email: this.props.user.email, email_to_verify: this.props.user.sender_email_pending}
            this.props.checkEmailVerificationStatus(values)
        }

    }

    componentDidUpdate() {
        if (this.state.intervalActive && this.state.emailSubmittedForVerification == this.props.user.sender_email_verified) {
            clearInterval(this.state.intervalId)
        }
    }

    toggleVerifyEmail() {
        this.setState({showVerifyEmail: !this.state.showVerifyEmail})
    }

    handleChange(e) {
        this.setState({ emailFromInput: e.target.value });
    }

    verifyEmail() {
        let values = {email: this.props.user.email, email_to_verify: this.state.emailFromInput}
        this.setState({ emailSubmittedForVerification: this.state.emailFromInput })
        this.props.verifyEmail(values, () => {
                this.setState({ showSuccessModal: true })
                let intervalId = setInterval(() => {
                    this.setState({ showVerifyEmail: false })
                    this.props.checkEmailVerificationStatus(values)
                    this.setState({ intervalActive: true })
                    this.setState({ intervalId: intervalId })
                }, 2000);
            },

            () => {
                this.setState({ showErrorModal: true })
            });
    }


  render() {
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
                      <div className="col-sm-12">
                      Account Email: {this.props.user.email}
                      </div>
                      { this.props.user.sender_email_verified ?
                          <div>
                              <div className="col-sm-8">
                                  <p className="user-details-p">Verified Sender Email: {this.props.user.sender_email_verified}</p>
                                  <h6>Any emails sent from this app will come from the verified sender email</h6>

                              </div>
                              <div className="col-sm-4">
                                  <button type="button" className="btn btn-secondary" onClick={this.toggleVerifyEmail}>Change Sender Email</button>
                              </div>
                          </div>
                      : <div>
                              <div className="col-sm-8">
                                  <p className="user-details-p">You do not have a verified sender email address. No emails can be sent from this app until
                                      an email address is verified.</p>

                              </div>
                              <div className="col-sm-4">
                                  <button type="button" className="btn btn-secondary" onClick={this.toggleVerifyEmail}>Verify Sender Email</button>
                              </div>
                          </div>

                      }
                      { this.props.user.sender_email_pending ?
                      <div className="col-sm-12">
                          <p className="user-details-p">Pending Sender Email: {this.props.user.sender_email_pending}</p>
                          <h6>This email address is still awaiting verification. Please check your email for an email from Amazon Web Services and follow the confirmation instructions.</h6>

                      </div>
                          : null }
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
          <div>
              <SweetAlert
                  show={this.state.showSuccessModal}
                  title="Success!"
                  type="success"
                  text="Your email was submitted for verification! Check your email for an email from Amazon Web Services and click the link to finish verification."
                  onConfirm={() => this.props.history.push('/')}
              />
          </div>
          <div>
              <SweetAlert
                  show={this.state.showErrorModal}
                  title="Error"
                  type="error"
                  text="There was an error submitting your email address for verification. Please try again."
                  onConfirm={() => this.setState({ showErrorModal: false })}
              />
          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
    mapStateToProps, { createEvent, verifyEmail, checkEmailVerificationStatus }
)(UserOverlay);
