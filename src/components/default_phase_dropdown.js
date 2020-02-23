import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchPhaseInstructions, fetchPhaseTasks, fetchPhaseEmails, createTask, createInstruction, fetchFiles, createEmail} from '../actions';

class DefaultPhaseDropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddDefault: false,
      selectedType: "instruction",
    };
    this.toggleAddContent = this.toggleAddContent.bind(this);
  }
  componentWillMount () {
  this.props.initialize({
    selectedType: 'instruction'
  });
}
  toggleAddContent(field_name) {
    this.setState({[field_name]: !this.state[field_name]})
  }
  togglePhaseContent = () => {
    this.props.toggleContent(this.props.name);
    this.setState({selectedType: 'instruction'});
    this.setState({showAddDefault: false});
  }
  renderNameField(field) {
    return (
      <div className="form-group">
        <input type="text" className="form-control" {...field.input} placeholder="Name"/>
      </div>
    )
  }
  renderDescriptionField(field) {
    return (
      <div className="form-group description-field">
          <input type="text" className="form-control" {...field.input} placeholder="Description"/>
      </div>
    )
  }
  renderDueDateField(field) {
    return (
      <div className="form-group due-date-field">
        <input type="number" placeholder="Due Date" className="form-control" {...field.input}/>
        <span className="italic">(Set your due date as the number of days before the event start date)</span>
      </div>
    )
  }
  renderSubjectField(field) {
    return (
      <div className="form-group subject-field">
        <input type="text" className="form-control" {...field.input} placeholder="Subject"/>
      </div>
    )
  }
  renderBodyField(field) {
    return (
      <div className="form-group email-body-field">
        <textarea className="form-control" {...field.input} placeholder="Email body"/>
      </div>
    )
  }
  onSubmit(values) {
    console.log('submit', this.state)
      values.phase_id = this.props.phaseId;
    if (this.state.selectedType === "task") {
        this.props.createTask(values, () => {
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    } else if (this.state.selectedType === "instruction") {
        this.props.createInstruction(values, () => {
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    } else if (this.state.selectedType === "email") {
      values.event_id = this.props.defaultId;
        this.props.createEmail(values, () => {
            console.log('submit email', values);
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    }


  }
  render() {
    const { handleSubmit } = this.props;
    // console.log('state',this.state)
      console.log('props',this.props)
    return(
        <div className="phase-defaults">
          <button className="btn btn-link" type="button" onClick={this.togglePhaseContent}>
            {this.props.name}
            <FontAwesomeIcon icon={(this.props.show ? "angle-up" : "angle-down")} />
          </button>
          <div className={"collapsable" + (this.props.show ? " show" : '')}>
            <div className="form-group row">
              <div className="col-sm-4">
                 <label className="col col-form-label">Add default:</label>
                  <select className="form-control" onChange={(e) => this.setState({selectedType: e.target.value})}>
                    <option value="instruction">Instruction</option>
                    <option value="task">Task</option>
                    <option value="email">Email</option>
                  </select>
                <FontAwesomeIcon icon="plus-circle" className="green" onClick={(e) => this.setState({showAddDefault: true})} />
              </div>
            </div>
              { (this.state.showAddDefault && this.state.selectedType != "email") &&
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="phase-defaults-add-new">
                      <Field name="name" component={this.renderNameField}/>
                      <Field name="content" component={this.renderDescriptionField}/>
                      <button type="submit" className="btn btn-primary">Add</button>
                      {this.state.selectedType === 'task' &&
                        <Field name="due_date" component={this.renderDueDateField}/>
                      }
                  </form>
              }
              { (this.state.showAddDefault && this.state.selectedType === "email") &&
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="phase-defaults-add-new">
                  <Field name="name" component={this.renderNameField} />
                  <Field name="subject" component={this.renderSubjectField} />
                  <button type="submit" className="btn btn-primary">Add</button>
                  <Field name="body" component={this.renderBodyField} />
                  <span className="italic"> All default emails are automatically set to send on first day of that phase, except for the default
                  registration email, which is automatically sent to each retreatant when added they are added.
                  Send dates can be edited within each event. </span>
                </form>
            }
            <div className="saved-defaults">
            //if there is nothing saved for this phase
            You do not have any default instructions, tasks, or emails saved for this phase.

            //list of instructions, tasks, email
            <div className="task-group default-group">
              <h5> Instructions </h5>
              <ul className="list-group">
              <li className="list-group-item" >
                <h6>Name of instruction</h6>
                <small>description
                </small>
              </li>
              <li className="list-group-item" >
                <h6>Name of instruction</h6>
                <small>description
                </small>
              </li>
              </ul>
            </div>
            <div className="task-group default-group">
              <h5> Tasks </h5>
              <ul className="list-group">
              <li className="list-group-item" >
                <h6>Name of task</h6>
                <small>description
                </small>
              </li>
              </ul>
            </div>
            <div className="default-group">
              <h5>Emails</h5>
            <div className="">
              <li className="list-group-item">
              <span> <strong>Name:</strong> name</span>
              <span> <strong>Subject:</strong> subject of email</span>
              <span><strong>Attached Files:</strong> Essential Retreat Information</span>
              <div className="email-content-display">
              Hi how are you this is an email
              </div>

              </li>
            </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    type: (formValueSelector('UpdateDefaultForm'))(state, 'selectedType'),
    phaseInstructions: state.phaseInstructions,
    phaseTasks: state.phaseTasks,
    phaseEmails: state.phaseEmails,
  }
}
export default reduxForm({
  form: 'UpdateDefaultForm'
})(
  connect(mapStateToProps, { fetchPhaseInstructions, fetchPhaseTasks, fetchPhaseEmails, createTask, createInstruction, fetchFiles, createEmail })(DefaultPhaseDropdown)
);
