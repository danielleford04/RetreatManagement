import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SavedDefaultsDisplay from '../components/saved_defaults_display.js';
import {setActiveDefaultPhase, fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, createDefaultTask, createDefaultInstruction, fetchFiles, createDefaultEmail} from '../actions';

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
      values.phase_id = this.props.phaseId;
    if (this.state.selectedType === "task") {
        this.props.createDefaultTask(values, () => {
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    } else if (this.state.selectedType === "instruction") {
        this.props.createDefaultInstruction(values, () => {
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    } else if (this.state.selectedType === "email") {
      values.event_id = this.props.defaultId;
        this.props.createDefaultEmail(values, () => {
            this.props.reset();
            this.setState({showAddDefault: false});

        });
    }


  }
  render() {
    const { handleSubmit } = this.props;

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
              <div>
              { (this.state.showAddDefault && this.state.selectedType != "email") &&
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="phase-defaults-add-new">
                      <Field name="name" component={this.renderNameField}/>
                      <Field name="content" component={this.renderDescriptionField}/>
                      <button type="submit" className="btn btn-primary">Add</button>
                      <FontAwesomeIcon icon="times" onClick={(e) => this.setState({showAddDefault: false})}/>
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
                  <FontAwesomeIcon icon="times" onClick={(e) => this.setState({showAddDefault: false})}/>
                  <Field name="body" component={this.renderBodyField} />
                  <span className="italic"> All default emails are automatically set to send on first day of that phase, except for the default
                  registration email, which is automatically sent to each retreatant when they are added.
                  Send dates can be edited within each event. </span>
                </form>
            }
              </div>
            <SavedDefaultsDisplay phaseId={this.props.phaseId} lastActiveDefaultPhase={this.props.lastActiveDefaultPhase} updateLastActiveDefaultPhase={this.props.updateLastActiveDefaultPhase}/>

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
