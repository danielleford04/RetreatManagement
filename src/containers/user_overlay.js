import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//TODO: close button that goesback to last page, also if you click outside of modal back to last page
//add defaults to DB
//wire in defaults
//route to update defaults
//create UI w drop downs and forms for defaults

class UserOverlay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegistrationContent: false,
      showPreparationContent: false,
      showArrivalContent: false,
      showDuringContent: false,
      showClosingContent: false,
      showFollowUpContent: false,
      // showErrorModal: false,
      // showDateValidationErrorModal: false,
    };
  }
  toggleRegistrationContent() {
    this.setState({
        showRegistrationContent: !this.state.showRegistrationContent
    });
}
togglePreparationContent() {
  this.setState({
      showPreparationContent: !this.state.showPreparationContent
  });
}
toggleArrivalContent() {
  this.setState({
      showArrivalContent: !this.state.showArrivalContent
  });
}
toggleDuringContent() {
  this.setState({
      showDuringContent: !this.state.showDuringContent
  });
}
toggleClosingContent() {
  this.setState({
      showClosingContent: !this.state.showClosingContent
  });
}
toggleFollowUpContent() {
  this.setState({
      showFollowUpContent: !this.state.showFollowUpContent
  });
}
stopPropagation(e) {
   e.stopPropagation();
 };

  render() {
    return(

      <div className="overlay-container" onClick={this.props.toggleUserOverlay}>
        <div className="overlay" onClick={this.stopPropagation} >
          <div className="jumbotron">
          <FontAwesomeIcon icon="times" className="close-icon" onClick={this.props.toggleUserOverlay} />
            <div className="user-settings">
              <h4> Settings </h4>
              <div>
                <p> Name: {this.props.user.first_name} {this.props.user.last_name ? this.props.user.last_name : ''} </p>
                <p> Emails sent from: {this.props.user.email}</p>
              </div>
            </div>
            <div className="default-settings">
              <h4>New Event Defaults</h4>
              <div className="event-type-dropdown">
                <div className="form-group row">
                   <label className="col-sm-4 col-form-label">Event Type:</label>
                   <div className="col-sm-8">
                   <select className="form-control">
                     <option value="residential">Residential Retreat</option>
                     <option value="day">Day Long</option>
                     <option value="class">Class</option>
                   </select>
                   </div>
                 </div>
              </div>
              <div className="phase-defaults">
                <button className="btn btn-link" type="button" onClick={() => this.setState({ showRegistrationContent: !this.state.showRegistrationContent })}>
                  Registration
                  <FontAwesomeIcon icon="angle-up" />
                </button>
                <div className={"collapsable" + (this.state.showRegistrationContent ? " show" : '')}>This is where tasks and instructions will go</div>
              </div>
              <div className="phase-defaults">
                <button className="btn btn-link" type="button" onClick={() => this.setState({ showPreparationContent: !this.state.showPreparationContent })}>
                  Preparation
                  <FontAwesomeIcon icon="angle-up" />
                </button>
                <div className={"collapsable" + (this.state.showPreparationContent ? " show" : '')}>This is where tasks and instructions will go</div>
              </div>
              <div className="phase-defaults">
                <button className="btn btn-link" type="button" onClick={() => this.setState({ showArrivalContent: !this.state.showArrivalContent })}>
                  Arrival
                  <FontAwesomeIcon icon="angle-up" />
                </button>
                <div className={"collapsable" + (this.state.showArrivalContent ? " show" : '')} >This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button" onClick={() => this.setState({ showDuringContent: !this.state.showDuringContent })}>
                    During
                    <FontAwesomeIcon icon="angle-up" />
                  </button>
                  <div className={"collapsable" + (this.state.showDuringContent ? " show" : '')}>This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button" onClick={() => this.setState({ showClosingContent: !this.state.showClosingContent })}>
                    Closing
                    <FontAwesomeIcon icon="angle-up" />
                  </button>
                  <div className={"collapsable" + (this.state.showClosingContent ? " show" : '')}>This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button" onClick={() => this.setState({ showFollowUpContent: !this.state.showFollowUpContent })}>
                    Follow Up
                    <FontAwesomeIcon icon="angle-up" />
                  </button>
                  <div className={"collapsable" + (this.state.showFollowUpContent ? " show" : '')}>This is where tasks and instructions will go</div>
                </div>
              </div>
            </div>

          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps
)(UserOverlay);
