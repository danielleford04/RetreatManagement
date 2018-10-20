import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { createTask, createInstruction } from '../actions';

class NewTask extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showSuccessModal: false,
      showErrorModal: false,
    };
    this.selector = formValueSelector('TaskNewForm');
  }
  componentWillMount () {
  this.props.initialize({
    type: 'instruction',
    phase: 'Registration'
  });
}
  renderNameField(field) {
    return (
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderDateField(field) {
    return (
      <div className="form-group">
        <label>Start Date:</label>
        <input type="date" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderPhaseField(field) {
    return (
      <div className="form-group">
         <label>Event Phase:</label>
         <select className="form-control" {...field.input}>
           <option value="Registration">Registration</option>
           <option value="Preparation">Preparation</option>
           <option value="Arrival">Arrival</option>
           <option value="During">On Retreat</option>
           <option value="Closing">Closing</option>
           <option value="Follow Up">Follow Up</option>
         </select>
       </div>
    )
  }
  renderTypeField(field) {
    return (
      <div className="form-group">
         <label>Task Type:</label>
         <select className="form-control"  {...field.input}>
           <option value="instruction">Instruction</option>
           <option value="task">Task</option>
         </select>
       </div>
    )
  }
  renderTaskField(field) {
    return (
      <div className="form-group">
        <label>Task:</label>
        <textarea className="form-control" {...field.input}/>
      </div>
    )
  }
  renderDueDateField(field) {
    return (
      <div className="form-group">
        <label>Due Date:</label>
        <input type="date" className="form-control" {...field.input}/>
      </div>
    )
  }

  onSubmit(values) {
    for (let phase of this.props.eventPhases) {
      if (phase.name === values.phase) {
        values.phase_id = phase._id;
      }
    }
    if(values.type==="instruction") {
    this.props.createInstruction(values, () => {
      this.setState({ showSuccessModal: true })},
      () => {
        this.setState({ showErrorModal: true })

    });
  } else {
    this.props.createTask(values, () => {
      this.setState({ showSuccessModal: true })},
      () => {
        this.setState({ showErrorModal: true })

    });
  }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
      <div>
        <h3> Create Task </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="phase" component={this.renderPhaseField} />
          <Field name="type" component={this.renderTypeField} />
          <Field name="name" component={this.renderNameField} />
          <Field name="content" component={this.renderTaskField} />
          {this.props.type === 'task' ? <Field name="due_date" component={this.renderDueDateField} /> : null}
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      </div>
      <div>
        <SweetAlert
          show={this.state.showSuccessModal}
          title="Success!"
          type="success"
          text="This task was successfully added."
          onConfirm={() => this.props.history.push('/instructions')}
        />
      </div>
      <div>
        <SweetAlert
          show={this.state.showErrorModal}
          title="Error"
          type="error"
          text="There was an error adding this task. Please try again."
          onConfirm={() => this.setState({ showErrorModal: false })}
        />
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    type: (formValueSelector('TaskNewForm'))(state, 'type'),
    eventPhases: state.eventPhases,
  }
}
export default reduxForm({
  form: 'TaskNewForm'
})(
  connect(mapStateToProps, { createTask, createInstruction })(NewTask)
);
