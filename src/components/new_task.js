import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createTask } from '../actions';

class NewTask extends Component {
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
         <select className="form-control" {...field.select}>
           <option value="registration">Registration</option>
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
         <select className="form-control" {...field.select}>
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
    this.props.createEvent(values, () => {
      this.props.history.push('/')
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3> Create Task </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="phase" component={this.renderPhaseField} />
          <Field name="type" component={this.renderTypeField} />
          <Field name="name" component={this.renderNameField} />
          <Field name="task" component={this.renderTaskField} />
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  form: 'TaskNewForm'
})(
  connect(null, { createTask })(NewTask)
);
