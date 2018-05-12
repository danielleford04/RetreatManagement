import React, { Component } from 'react';

class ScheduledEmail extends Component {
  render() {
    return(
      <div>
        <h3> Scheduled Email </h3>
        <h5> Date to Send: </h5>
        <p> 6/5/2017 </p>
        <h5> Subject: </h5>
        <p> Looking for Volunteers to Sleep in the Common Area</p>
        <div className="jumbotron">
        <p> Hello all, <br/> We are looking for 4 volunteers to sleep in the common area. <br/> Metta, <br/> Danielle</p>
        </div>
        <h5>Forms Attached:</h5>
        <p>Essential Retreat Information, Liability Waiver</p>
        <br/>
        <p>TODO:<br/>inline edit, or press edit button to open form and edit fields </p>
      </div>
    );
  }
}

export default ScheduledEmail;
