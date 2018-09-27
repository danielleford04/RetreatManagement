import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStoredForm } from '../actions';

class NewForm extends Component {
  renderNameField(field) {
    return (
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderFileField(field) {
    return (
      <div className="form-group">
        <label>File:</label>
        <input type="file" value={null} className="form-control" {...field.input}/>
      </div>
    )
  }
  renderNotesField(field) {
    return (
      <div className="form-group">
        <label>Notes:</label>
        <textarea className="form-control" {...field.input}/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createStoredForm(values, () => {
      this.props.history.push('/')
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3> Upload a Form </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="file" component={this.renderFileField} />
          <Field name="notes" component={this.renderNotesField} />
          <button type="submit" className="btn btn-primary">Upload Form</button>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  form: 'FormNewForm'
})(
  connect(null, { createStoredForm })(NewForm)
);
