import React, { Component } from 'react';

class ScheduleEmail extends Component {
  render() {
    return(
      <div>
        <h3> Schedule an Email </h3>
        <form>
        Date to Send Email:
        <input type="date" className="form-control" /><br />
        Subject:
        <input type="text" className="form-control" /> <br />
        Email Body: <br />
        <textarea className="form-control"/>
        <button type="submit" className="btn btn-primary">Schedule or Send Email</button>
      </form>
      <p>To Do: <br/>Send Now or schedule option. <br/>Attach form with select for drop down of stored forms.<br/>Better datepicker.</p>
      </div>
    );
  }
}

export default ScheduleEmail;
