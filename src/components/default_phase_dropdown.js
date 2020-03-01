import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SavedDefaultsDisplay from '../components/saved_defaults_display.js';
import {setActiveDefaultPhase, fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, createDefaultTask, createDefaultInstruction, fetchFiles, createDefaultEmail} from '../actions';
import SweetAlert from "sweetalert2-react";

class DefaultPhaseDropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddDefault: false,
      selectedType: "instruction",
      showErrorModal: false,
    };
    this.toggleAddContent = this.toggleAddContent.bind(this);
    this.hideAddDefaultAndClearForm = this.hideAddDefaultAndClearForm.bind(this);
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
    if (!this.props.show) {
      this.props.setActiveDefaultPhase(this.props.phaseId)
    }
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
  hideAddDefaultAndClearForm(){
      this.props.reset();
      this.setState({showAddDefault: false})
  }
  onSubmit(values) {
      values.phase_id = this.props.phaseId;
    if (this.state.selectedType === "task") {
        if (values.name ===undefined || values.description === undefined || values.due_date === undefined) {
            this.setState({ showErrorModal: true })
            return;
        } else {
            this.props.createDefaultTask(values, () => {
                this.props.reset();
                this.setState({showAddDefault: false});

            });
        }
    } else if (this.state.selectedType === "instruction") {
        if (values.name ===undefined || values.description === undefined) {
            this.setState({ showErrorModal: true })
            return;
        } else {
            this.props.createDefaultInstruction(values, () => {
                this.props.reset();
                this.setState({showAddDefault: false});

            });
        }
    } else if (this.state.selectedType === "email") {
        if (values.name ===undefined || values.subject === undefined || values.body === undefined) {
            this.setState({ showErrorModal: true })
            return;
        } else {
            values.event_id = this.props.defaultId;
            this.props.createDefaultEmail(values, () => {
                this.props.reset();
                this.setState({showAddDefault: false});

            });
        }
    }


  }
  render() {
    const { handleSubmit } = this.props;

    return(
        <div className="phase-defaults">
          <div className="phase-title">
              <button className="btn btn-link" type="button" onClick={this.togglePhaseContent}>
                {this.props.name}
                <FontAwesomeIcon icon={(this.props.show ? "angle-up" : "angle-down")} />
              </button>
          </div>
          <div className={"collapsable" + (this.props.show ? " show" : '')}>
            <div className="add-default-container">
                <div className="form-group row">
                  <div className="col-sm-6">
                     <label className="col col-form-label">Add Default</label>
                      <select className="form-control" onChange={(e) => this.setState({selectedType: e.target.value})}>
                        <option value="instruction">Instruction</option>
                        <option value="task">Task</option>
                        <option value="email">Email</option>
                      </select>
                    <FontAwesomeIcon icon="plus-circle" className="green" onClick={(e) => this.setState({showAddDefault: true})} />
                  </div>
                </div>
                  <div className="new-default-form">
                  { (this.state.showAddDefault && this.state.selectedType != "email") &&
                      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="phase-defaults-add-new">
                          {this.state.selectedType === 'task' &&
                            <p className="create-default-helper-text"> Set your due date as the number of days before the
                              event start date</p>
                          }
                          <Field name="name" component={this.renderNameField}/>
                          <Field name="content" component={this.renderDescriptionField}/>
                          {this.state.selectedType === 'task' &&
                          <Field name="due_date" component={this.renderDueDateField}/>
                          }
                          <div className="add-default-buttons">
                            <button type="submit" className="btn btn-primary">Add</button>
                            <FontAwesomeIcon className="cancel-new-default" icon="times" onClick={this.hideAddDefaultAndClearForm}/>
                          </div>
                      </form>
                  }
                  { (this.state.showAddDefault && this.state.selectedType === "email") &&
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="phase-defaults-add-new">
                        <p className="create-default-helper-text"> All default emails are automatically set to send on first day of that phase, except for the default
                            registration email, which is automatically sent to each retreatant when they are added.
                            Send dates can be edited within each event. </p>
                      <Field name="name" component={this.renderNameField} />
                      <Field name="subject" component={this.renderSubjectField} />
                      <div className="add-default-buttons">
                        <button type="submit" className="btn btn-primary">Add</button>
                        <FontAwesomeIcon icon="times" className="cancel-new-default" onClick={this.hideAddDefaultAndClearForm}/>
                      </div>
                      <Field name="body" component={this.renderBodyField} />

                    </form>
                }
                  </div>
            </div>
            <SavedDefaultsDisplay phaseId={this.props.phaseId} lastActiveDefaultPhase={this.props.lastActiveDefaultPhase} updateLastActiveDefaultPhase={this.props.updateLastActiveDefaultPhase}/>

          </div>
            <div>
                <SweetAlert
                    show={this.state.showErrorModal}
                    title="Error"
                    type="error"
                    text="Please complete all fields."
                    onConfirm={() => this.setState({ showErrorModal: false })}
                />
            </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    type: (formValueSelector('UpdateDefaultForm'))(state, 'selectedType'),
      selectedDefaultPhaseId: state.selectedDefaultPhaseId,
  }
}
export default reduxForm({
  form: 'UpdateDefaultForm'
})(
  connect(mapStateToProps, { setActiveDefaultPhase, fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, createDefaultTask, createDefaultInstruction, fetchFiles, createDefaultEmail })(DefaultPhaseDropdown)
);
