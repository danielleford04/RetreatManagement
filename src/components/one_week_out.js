import React, { Component } from 'react';

class OneWeekOut extends Component {
  render() {
    return(
      <div>
        <h3> One Week Before </h3>
        <h5> General Instructions </h5>
        <ul className="list-group">
          <li className="list-group-item">
            <h5>Challenging Questions</h5>
            <small>Contact Terry for any challenging questions or requests.
            </small>
          </li>
          <li className="list-group-item">
            <h5>Cancellations</h5>
            <small>Cancellations occur often the last few days before a retreat. Usually no refund is given.  If the yogi is insistent ask them to please contact Terry for special considerations for refund.
            </small>
          </li>
        </ul>
        <h5> Tasks </h5>
        <ul className="list-group">
          <li className="list-group-item">
            <h5>Finalize Meal Partner List</h5>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
              <label className="form-check-label" for="defaultCheck1">
                Use the retreat schedule to create a bell ringer sign up schedule to post at the retreat (reminder will be sent to admin on 4/20)
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
        <p> Subject: Car Pool and Meal Partners for Terry Ray Daylong 4/22</p>
        <div className="jumbotron">
        <p>  Dear Yogis,
          The retreat is fast approaching. I hope by now you have contacted your meal partner.  If there is a problem, please let me know as soon as possible.
            <br/>We encourage ride sharing.   If you can offer a ride or need a ride please send an email out to the entire group.
            <br/>
        <br/>Metta,<br/>Danielle
        </p>
        </div>
        <p>Attached Files: None</p>
        <p><br/>TODO:<br/>Says if sent or not. if sent, say who received, and also have ability to send now to additional person</p>
      </div>
    );
  }
}

export default OneWeekOut;
