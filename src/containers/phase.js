import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDisplayDateWithMoment, isDatePast } from '../global/utilities';
import { fetchPhaseInstructions, fetchPhaseTasks, fetchPhaseEmails, updateTask } from '../actions';

class PhasePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActivePhase: this.props.activePhase,
      activePhaseDetails: null,
    };
  }
  componentDidMount() {
    if (this.props.activePhase) {
      this.props.fetchPhaseInstructions(this.props.activePhase);
      this.props.fetchPhaseEmails(this.props.activePhase);
      this.props.fetchPhaseTasks(this.props.activePhase);

      for (let phase of this.props.eventPhases) {
        if (this.props.activePhase === phase._id) {
          this.setState({ activePhaseDetails: phase })
        }
      }
    }
  }
  componentDidUpdate() {
    if((this.props.activePhase !== this.state.lastActivePhase)  ) {
    this.props.fetchPhaseInstructions(this.props.activePhase);
    this.props.fetchPhaseEmails(this.props.activePhase);
    this.props.fetchPhaseTasks(this.props.activePhase);
      this.setState({ lastActivePhase: this.props.activePhase })
      for (let phase of this.props.eventPhases) {
        if (this.props.activePhase === phase._id) {
          this.setState({ activePhaseDetails: phase })
        }
      }
  }
  }
  renderInstructionList() {
    if (this.props.phaseInstructions.length === 0) {
      return (
        <li className="list-group-item no-item-message">
          <h6>No Instructions</h6>
          <small>There are no instructions saved for this phase of this event.
          <Link to="new_task"> Add an instruction for this phase.</Link>
          </small>
        </li>
      );
    }

    return this.props.phaseInstructions.map((instruction) => {
      return (
        <li className="list-group-item" key={instruction._id}>
          <h6>{instruction.name}</h6>
          <small>{instruction.content}
          </small>
        </li>
      );
    })
  }
  renderTaskList() {
    if (this.props.phaseTasks.length === 0) {
      return (
        <li className="list-group-item no-item-message">
          <h6>No Tasks</h6>
          <small>There are no tasks saved for this phase of this event.
          <Link to="new_task"> Add a task for this phase.</Link>
          </small>
        </li>
      );
    }

    return this.props.phaseTasks.map((task) => {

      return (
        <li className={"task-list list-group-item" + (task.complete ? " disabled" : '') + (!task.complete && isDatePast(task.due_date) ? " overdue" : '')} key={task._id}>
        <div>
          <input className="form-check-input" onChange={()=>this.updateTaskCompetionStatus(task)} type="checkbox" value="" checked={task.complete} name={task._id+"-checkbox"} id={task._id+"-checkbox"}/>
          <label className="form-check-label" htmlFor={task._id+"-checkbox"}>
          <h6>{formatDisplayDateWithMoment(task.due_date)} - {task.name}</h6>

          </label>
          </div>
          <small>{task.content}
          </small>
        </li>

      );
    })
  }

  updateTaskCompetionStatus(task) {
    const values = {task_id: task._id, complete: !task.complete}
    this.props.updateTask(values, () => {
      this.props.fetchPhaseTasks(this.props.activePhase);
    });
  }

  renderEmails() {
    if (this.props.phaseEmails.length === 0) {
      return (
        <li className="list-group-item no-item-message">
          <h6>No Saved Emails</h6>
          <small>There are no emails saved for this phase of this event.
          <Link to="new_email"> Add an email for this phase.</Link>
          </small>
        </li>
      );
    }

    return this.props.phaseEmails.map((email) => {
        if (this.props.phaseEmails.type !== "confirmation")
      return (
        <li className="list-group-item" key={email._id}>
        <strong>{email.name}</strong>
        <p> <strong>Subject:</strong> {email.subject}</p>
        <div className="email-content-display">
        {email.body}
        </div>
        <p><strong>Attached Files:</strong> Essential Retreat Information</p>
        </li>
      );
    })
  }

    renderConfirmationEmail() {

        return this.props.phaseEmails.map((email) => {
            if (this.props.phaseEmails.type === "confirmation") {
                return (
                    <li className="list-group-item" key={email._id}>
                        <p><strong>Subject:</strong> {email.subject}</p>
                        <div className="email-content-display">
                            {email.body}
                        </div>
                        <p><strong>Attached Files:</strong> Essential Retreat Information</p>
                    </li>
                );
            }
        })
    }

  render() {
      console.log(1,this.state.activePhaseDetails)
      console.log(2,this.props.phaseEmails)
      let isRegistration = false;
      if (this.state.activePhaseDetails&& this.state.activePhaseDetails.name  === "Registration") { isRegistration = true;}
    return(
      <div>
        <h3>{this.state.activePhaseDetails&& this.state.activePhaseDetails.name ? this.state.activePhaseDetails.name : ''}</h3>
        <div className="task-group">
          <h5> General Instructions </h5>
          <ul className="list-group">
            {this.renderInstructionList()}
          </ul>
        </div>
        <div className="task-group">
          <h5> Tasks </h5>
          <ul className="list-group">
            {this.renderTaskList()}
          </ul>
        </div>
          { isRegistration &&
          <div className="task-group">
              <h5>Confirmation Email</h5>
              <p>This email is automatically sent to any attendee when they are added to the attendee list.</p>
              <div className="task-group">
                  {this.renderConfirmationEmail()}
              </div>
          </div>

          }
        <div className="task-group">
          <h5>Saved Emails</h5>
        <div className="task-group">
          {this.renderEmails()}
        </div>
        </div>
        <div className="task-group">
        <p><br/>TODO:<br/>Confirmation email sent to who, what day. Also able to manually enter if sent out of app. Also ability to send now to someone.</p>
        </div>
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
    phaseEmails: state.phaseEmails,
  }
}

export default connect(mapStateToProps, { fetchPhaseInstructions, fetchPhaseTasks, fetchPhaseEmails, updateTask })(PhasePage);
