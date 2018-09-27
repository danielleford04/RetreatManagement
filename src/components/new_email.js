import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEmail } from '../actions';

class NewEmail extends Component {
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
        <label>Date to Send:</label>
        <input type="date" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderBodyField(field) {
    return (
      <div className="form-group">
        <label>Email Body:</label>
        <textarea className="form-control" {...field.input}/>
      </div>
    )
  }
  renderSubjectField(field) {
    return (
      <div className="form-group">
        <label>Subject:</label>
        <input type="text" className="form-control" {...field.input}/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createEmail(values, () => {
      this.props.history.push('/')
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3> Schedule an Email </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="date" component={this.renderDateField} />
          <Field name="subject" component={this.renderSubjectField} />
          <Field name="body" component={this.renderBodyField} />
          <button type="submit" className="btn btn-primary">Create Email</button>
        </form>
      <p>To Do: <br/>Send Now or schedule option. <br/>Attach form with select for drop down of stored forms.<br/>Better datepicker.</p>
      </div>
    );
  }
}
export default reduxForm({
  form: 'EmailNewForm'
})(
  connect(null, { createEmail })(NewEmail)
);
