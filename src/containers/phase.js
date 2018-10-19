import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPhaseInstructions, fetchPhaseTasks } from '../actions';

class PhasePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActivePhase: this.props.activePhase,
    };
  }
  componentDidMount() {
    if (this.props.activePhase) {
      this.props.fetchPhaseInstructions(this.props.activePhase);
      this.props.fetchPhaseTasks(this.props.activePhase);
    }
  }
  componentDidUpdate() {
    if((this.props.activePhase !== this.state.lastActivePhase)  ) {
    this.props.fetchPhaseInstructions(this.props.activePhase);
    this.props.fetchPhaseTasks(this.props.activePhase);
      this.setState({ lastActivePhase: this.props.activePhase })
  }
  }
  renderInstructionList() {

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
  renderTaskList() {
    return this.props.phaseTasks.map((task) => {
      return (
        <li className="list-group-item" key={task._id}>
          <h5>{task.name}</h5>
          <small>{task.content}
          </small>
        </li>
      );
    })
  }

  render() {
    return(
      <div>
    <h3>Phase name </h3>
        <h5> General Instructions </h5>
        <ul className="list-group">

{this.renderInstructionList()}
        </ul>
        <h5> Tasks </h5>
        <ul className="list-group">

{this.renderTaskList()}
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
    eventPhases: state.eventPhases,
    activePhase: state.activePhase,
    phaseInstructions: state.phaseInstructions,
    phaseTasks: state.phaseTasks,
  }
}

export default connect(mapStateToProps, { fetchPhaseInstructions, fetchPhaseTasks })(PhasePage);
