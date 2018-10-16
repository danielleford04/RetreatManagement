import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { createEvent } from '../actions';

class NewEvent extends Component {
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
        <label>Start Date:</label>
        <input type="date" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderRetreatantCountField(field) {
    return (
      <div className="form-group">
        <label>Event Capacity:</label>
        <input type="number" className="form-control" {...field.input}/>
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
    )
  }

  onSubmit(values) {
    this.props.createEvent(values, () => {
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
        <h3> Create Event </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="type" component={this.renderEventTypeField} />
          <Field name="start_date" component={this.renderDateField} />
          <Field name="retreatantCount" component={this.renderRetreatantCountField} />
          <button type="submit" className="btn btn-primary">Create Event</button>
        </form>
      <p>To Do: <br/>End date if residential <br/>Better datepicker.</p>
      </div>
      <div>
        <SweetAlert
          show={this.state.showSuccessModal}
          title="Success!"
          type="success"
          text="This event was successfully created."
          onConfirm={() => this.props.history.push('/')}
        />
      </div>
      <div>
        <SweetAlert
          show={this.state.showErrorModal}
          title="Error"
          type="error"
          text="There was an error creating this event. Please try again."
          onConfirm={() => this.setState({ showErrorModal: false })}
        />
      </div>
      </div>
    );
  }
}
export default reduxForm({
  form: 'EventNewForm'
})(
  connect(null, { createEvent })(NewEvent)
);
