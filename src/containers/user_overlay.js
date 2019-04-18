import React, { Component } from 'react';
import { connect } from 'react-redux';

//TODO: close button that goesback to last page, also if you click outside of omdal back to last page
//add defaults to DB
//wire in defaults
//route to update defaults
//create UI w drop downs and forms for defaults

class UserOverlay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showPhaseContent: false,
      // showErrorModal: false,
      // showDateValidationErrorModal: false,
    };
  }
  togglePhaseContent() {
    this.setState({
        showPhaseContent: !this.state.showPhaseContent
    });
}

  render() {
    return(

      <div className="overlay-container">
        <div className="overlay">
          <div className="jumbotron">
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
                <button className="btn btn-link" type="button" onClick={this.togglePhaseContent}>
                  Registration
                </button>
                <div className={"collapsable" + (this.props.showPhaseContent ? " show" : '')}>This is where tasks and instructions will go</div>
              </div>
              <div className="phase-defaults">
                <button className="btn btn-link" type="button">
                  Preparation
                </button>
                <div className="collapsable">This is where tasks and instructions will go</div>
              </div>
              <div className="phase-defaults">
                <button className="btn btn-link" type="button">
                  Arrival
                </button>
                <div className="collapsable">This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button">
                    Registration
                  </button>
                  <div className="collapsable">This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button">
                    Preparation
                  </button>
                  <div className="collapsable">This is where tasks and instructions will go</div>
                </div>
                <div className="phase-defaults">
                  <button className="btn btn-link" type="button">
                    Arrival
                  </button>
                  <div className="collapsable">This is where tasks and instructions will go</div>
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
