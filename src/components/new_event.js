import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEvent } from '../actions';

class NewEvent extends Component {
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
  renderEventTypeField(field) {
    return (
      <div className="form-group">
         <label>Event Type:</label>
         <select className="form-control" {...field.select}>
           <option value="residential">Residential Retreat</option>
           <option value="day">Day Long</option>
           <option value="class">Class</option>
         </select>
       </div>
      // <div className="form-group">
      //   <label>Event Body:</label>
      //   <input type="textarea" className="form-control" {...field.input}/>
      // </div>
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
        <h3> Create Event </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="type" component={this.renderEventTypeField} />
          <Field name="start_date" component={this.renderDateField} />
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      <p>To Do: <br/>End date if residential <br/>Better datepicker.</p>
      </div>
    );
  }
}
export default reduxForm({
  form: 'EventNewForm'
})(
  connect(null, { createEvent })(NewEvent)
);
