import React, { Component } from 'react';

class TwoWeeksOut extends Component {
  render() {
    return(
      <div>
        <h3> Registration </h3>
        <h5> Tasks </h5>
        <ul className="list-group">
          <li className="list-group-item">
            <h5>Finalize Meal Partner List</h5>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
              <label className="form-check-label" for="defaultCheck1">
                Make meal partner list (reminder will be sent to admin on 4/18 to do meal partners)
              </label>
            </div>
          </li>
          <li className="list-group-item">
            <small>
            send out email below with finalized meal list
            </small>
          </li>
        </ul>
        <h5>Email</h5>
        <p> Subject: Final Retreat Confirmation for Terry Ray Daylong 4/22</p>
        <div className="jumbotron">
        <p> Thank you for your registration in The September 27 – October 1, 2017 meditation retreat at the YMCA of the Rockies. You will find attached Essential Information, as
        well as a Liability Waiver and Previous Experience form. Please fill them out and have them ready when you arrive. <br/>
        Below, you will find meal partners. Please blah blah blah. <br/>
        <br/>Metta,<br/>Danielle
        </p>
        </div>
        <p>Attached Files: Essential Retreat Information, Liability Waiver, Previous Experience</p>
        <p><br/>TODO:<br/>Says if sent or not. if sent, say who received, and also have ability to send now to additional person</p>
      </div>
    );
  }
}

export default TwoWeeksOut;
