import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { createEmail } from '../actions';

class NewEmail extends Component {
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
    values.event_id = this.props.activeEvent;
    
    this.props.createEmail(values, () => {
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
      <div>
        <SweetAlert
          show={this.state.showSuccessModal}
          title="Success!"
          type="success"
          text="This email was successfully saved."
          onConfirm={() => this.props.history.push('/')}
        />
      </div>
      <div>
        <SweetAlert
          show={this.state.showErrorModal}
          title="Error"
          type="error"
          text="There was an error saving this email. Please try again."
          onConfirm={() => this.setState({ showErrorModal: false })}
        />
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    // type: (formValueSelector('TaskNewForm'))(state, 'type'),
    activeEvent: state.activeEvent,
  }
}
export default reduxForm({
  form: 'EmailNewForm'
})(
  connect(mapStateToProps, { createEmail })(NewEmail)
);
