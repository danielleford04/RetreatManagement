import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createTask, createInstruction } from '../actions';
//TODO: phase ids for values, also success/error modals
class NewTask extends Component {
  componentWillMount () {
  this.props.initialize({
    type: 'instruction',
    phase: 'registration'
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
           <option defaultValue value="registration">Registration</option>
           <option value="preparation">Preparation</option>
           <option value="arrival">Arrival</option>
           <option value="onRetreat">On Retreat</option>
           <option value="tearDown">Tear Down</option>
           <option value="followUp">Follow Up</option>
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

  onSubmit(values) {
    console.log(values)
    if(values.type==="instruction") {
    this.props.createInstruction(values, () => {
      this.props.history.push('/')
    });
  } else {
    this.props.createTask(values, () => {
      this.props.history.push('/')
    });
  }
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3> Create Task </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="phase_id" component={this.renderPhaseField} />
          <Field name="type" component={this.renderTypeField} />
          <Field name="name" component={this.renderNameField} />
          <Field name="content" component={this.renderTaskField} />
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  form: 'TaskNewForm'
})(
  connect(null, { createTask, createInstruction })(NewTask)
);
