import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPhaseInstructions } from '../actions';
//re-render when active phase changes
class PhasePage extends Component {
  componentDidMount() {
    if (this.props.activePhase) {
      this.props.fetchPhaseInstructions(this.props.activePhase);
    }
  }
  // componentDidMount() {
  //   if (this.props.activePhase) {
  //     this.props.fetchPhase(this.props.activePhase);
  //   }
  // }
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     phase: null,
  //   };
  // }
  // componentDidMount() {
  //   for (let phase of this.props.eventPhases) {
  //     console.log(phase._id, this.props.activePhase)
  //     if (phase._id === this.props.activePhase) {
  //       this.setState({ phase: phase })
  //     }
  //   }
    // if (this.props.activeEvent) {
    //   this.props.fetchEventRetreatants(this.props.activeEvent);
    // }
  // }
  // componentDidUpdate() {
  //   if((this.props.activePhase !== this.state.phase._id)  ) {
  //   // this.props.fetchEventPhases(this.props.activeEvent);
  //   for (let phase of this.props.eventPhases) {
  //     console.log(phase._id, this.props.activePhase)
  //     if (phase._id === this.props.activePhase) {
  //       this.setState({ phase: phase })
  //     }
  //   }
  // }
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
  renderInstructionList() {
    console.log(1, this.props.activePhase)
    console.log(2, this.props.phaseInstructions)
    return this.props.phaseInstructions.map((instruction) => {
      return (
        <li className="list-group-item" key={instruction._id}>
          <h5>{instruction.name}</h5>
          <small>{instruction.content}
          </small>
        </li>
      );
    })
  }

  render() {
    // console.log('phases',this.props.eventPhases)
    // console.log('state',this.state)
    return(
      <div>
    <h3>Phase name </h3>
        <h5> General Instructions </h5>
        <ul className="list-group">

{this.renderInstructionList()}
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
    // eventPhase: state.eventPhase,
    eventPhases: state.eventPhases,
    // retreatants: state.retreatants,
    activePhase: state.activePhase,
    phaseInstructions: state.phaseInstructions,
  }
}

export default connect(mapStateToProps, { fetchPhaseInstructions })(PhasePage);
// export default connect(mapStateToProps)(PhasePage);
