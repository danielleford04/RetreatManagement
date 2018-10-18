import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { createStoredForm } from '../actions';
import  FileUpload  from '../components/file_upload.js';

class NewForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showSuccessModal: false,
      showErrorModal: false,
    };
  }
  renderNameField(field) {
    return (
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" {...field.input}/>
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
      this.setState({ showSuccessModal: true })},
      () => {
        this.setState({ showErrorModal: true })
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
      <div>
        <h3> Upload a Form </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="file" component={FileUpload} />
          <Field name="notes" component={this.renderNotesField} />
          <button type="submit" className="btn btn-primary">Upload Form</button>
        </form>
      </div>
      <div>
        <SweetAlert
          show={this.state.showSuccessModal}
          title="Success!"
          type="success"
          text="This file was successfully uploaded."
          onConfirm={() => this.props.history.push('/stored_forms')}
        />
      </div>
      <div>
        <SweetAlert
          show={this.state.showErrorModal}
          title="Error"
          type="error"
          text="There was an error uploading this file. Please try again."
          onConfirm={() => this.setState({ showErrorModal: false })}
        />
      </div>
      </div>
    );
  }
}
export default reduxForm({
  form: 'FormNewForm'
})(
  connect(null, { createStoredForm })(NewForm)
);
