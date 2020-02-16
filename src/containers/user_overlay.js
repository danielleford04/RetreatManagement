import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultPhaseDropdown from '../components/default_phase_dropdown.js';
import { fetchDefaults } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//TODO:
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
    this.toggleContent = this.toggleContent.bind(this);
  }
  componentDidMount() {
      this.props.fetchDefaults(this.props.user._id);
  }
  toggleContent(name) {
    let nameWithSpacesRemoved = name.replace(/\s/g, '');
    let show_field_name = `show${nameWithSpacesRemoved}Content`;
    this.setState({[show_field_name]: !this.state[show_field_name]})
  }

stopPropagation(e) {
   e.stopPropagation();
 };

  render() {
    console.log(this.props)
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
              <DefaultPhaseDropdown
                name="Registration"
                toggleContent={this.toggleContent}
                show={this.state.showRegistrationContent}/>
              <DefaultPhaseDropdown
                name="Preparation"
                toggleContent={this.toggleContent}
                show={this.state.showPreparationContent}/>
              <DefaultPhaseDropdown
                name="Arrival"
                toggleContent={this.toggleContent}
                show={this.state.showArrivalContent}/>
              <DefaultPhaseDropdown
                name="During"
                toggleContent={this.toggleContent}
                show={this.state.showDuringContent}/>
              <DefaultPhaseDropdown
                name="Closing"
                toggleContent={this.toggleContent}
                show={this.state.showClosingContent}/>
              <DefaultPhaseDropdown
                name="Follow Up"
                toggleContent={this.toggleContent}
                show={this.state.showFollowUpContent}/>
              </div>
            </div>

          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  defaults: state.defaults
});
export default connect(
  mapStateToProps, { fetchDefaults }
)(UserOverlay);
