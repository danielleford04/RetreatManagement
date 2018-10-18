import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchEventRetreatants } from '../actions';

class PhasePage extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     lastActiveEvent: this.props.activeEvent,
  //   };
  // }
  // componentDidMount() {
  //   if (this.props.activeEvent) {
  //     this.props.fetchEventRetreatants(this.props.activeEvent);
  //   }
  // }
  // componentDidUpdate() {
  //   if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
  //   this.props.fetchEventRetreatants(this.props.activeEvent);
  //     this.setState({ lastActiveEvent: this.props.activeEvent })
  // }
  // }

  // renderList() {
  //   return this.props.retreatants.map((retreatant, index) => {
  //     return (
  //       <tr key={retreatant.email} >
  //         <th scope="row">{index+1}</th>
  //         <td>{retreatant.name}</td>
  //         <td>{retreatant.email}</td>
  //         <td>{retreatant.notes}</td>
  //       </tr>
  //     );
  //   })
  // }

  render() {
    return(
      <div>
        <h3> Registration </h3>
        <h5> General Instructions </h5>
        <ul className="list-group">
          <li className="list-group-item disabled">
            <h5>Pre-Retreat (off site) Manager</h5>
            <small>Manager’s email is listed on the flyers.<br/>
            Potential participants will email manager.
            </small>
          </li>
          <li className="list-group-item">
            <h5>Managing Questions</h5>
            <small>Manager replies and cc’s Terry or if she doesn’t know the answer forwards the email to Terry. <br/>Terry will respond to manager or answer the participant and cc the manager.
            </small>
          </li>
          <li className="list-group-item">
            <h5>Add Retreatant to Roster</h5>
            <small>Name, email, 	phone number and city, special requests or needs, amount paid or scholarship</small>
          </li>
          <li className="list-group-item">
            <h5>Cancellations</h5>
            <small>Usually no refund is given.  If the yogi is insistent ask them to please contact Terry for special considerations for refund.</small>
          </li>
          <li className="list-group-item">
            <h5></h5>
            <small></small>
          </li>
        </ul>
        <h5>Confirmation Email</h5>
        <p> Subject: Registration Confirmation for Terry Ray Daylong 4/22</p>
        <div className="jumbotron">
        <p> Thank you for your registration in The September 27 – October 1, 2017 meditation retreat at the YMCA of the Rockies.  Included is a list of essential retreat information that will help you prepare for the retreat.  <br/>
        We will contact you again about 2 weeks prior to the beginning of the retreat with information about food and rides.
        <br/>Metta,<br/>Danielle
        </p>
        </div>
        <p>Attached Files: Essential Retreat Information</p>
        <p><br/>TODO:<br/>Confirmation email sent to who, what day. Also able to manually enter if sent out of app. Also ability to send now to someone.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // retreatants: state.retreatants,
    activeEvent: state.activeEvent,
  }
}

// export default connect(mapStateToProps, { fetchEventRetreatants })(PhasePage);
export default connect(mapStateToProps)(PhasePage);
