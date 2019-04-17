import React, { Component } from 'react';
import { connect } from 'react-redux';

//TODO: close button that goesback to last page, also if you click outside of omdal back to last page
//wire in user name
//add defaults to DB
//wire in defaults
//route to update defaults
//create UI w drop downs and forms for defaults

class UserOverlay extends Component {

  render() {
    console.log(this.props)
    return(

      <div className="overlay-container">
        <div className="overlay">
          <div className="jumbotron">
            <h3> User Info </h3>
            <div>
              <h5> Name: {this.props.user.first_name} {this.props.user.last_name ? this.props.user.last_name : ''} </h5>
              <h5> Emails sent from: {this.props.user.email}</h5>
            </div>
            <div>
              <h3> Defaults</h3>
              <h6>Event type: drop down residential/class/day long </h6>
              <p>registration down arrow (etc with all phases)</p>
              <p>tasks</p>
              <p>instructions</p>
              <p>email</p>
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
