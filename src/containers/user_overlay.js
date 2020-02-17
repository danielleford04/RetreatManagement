import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultEditor from '../containers/default_editor.js';
import SetDefaultsControl from '../components/set_defaults_control.js';
import { createEvent } from '../actions';
// import DefaultPhaseDropdown from '../components/default_phase_dropdown.js';
// import { fetchDefaults } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";


class UserOverlay extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     showRegistrationContent: false,
  //     showPreparationContent: false,
  //     showArrivalContent: false,
  //     showDuringContent: false,
  //     showClosingContent: false,
  //     showFollowUpContent: false,
  //     // showErrorModal: false,
  //     // showDateValidationErrorModal: false,
  //   };
  //   this.toggleContent = this.toggleContent.bind(this);
  // }
  componentDidMount() {
      // this.props.fetchDefaults(this.props.user._id);
  }
  // toggleContent(name) {
  //   let nameWithSpacesRemoved = name.replace(/\s/g, '');
  //   let show_field_name = `show${nameWithSpacesRemoved}Content`;
  //   this.setState({[show_field_name]: !this.state[show_field_name]})
  // }

stopPropagation(e) {
   e.stopPropagation();
 };

  render() {
    console.log('user-overlay-props',this.props)
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
                <DefaultEditor defaults={this.props.user.defaults}/>
              }
            </div>

          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  // defaults: state.defaults
});
// export default connect(
//   mapStateToProps, { fetchDefaults }
// )(UserOverlay);
export default connect(
    mapStateToProps, { createEvent }
)(UserOverlay);
