import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { isDatePast, formatDisplayDateWithMoment } from '../global/utilities';
import { createEvent, setActiveEvent } from '../actions';

class NewEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showSuccessModal: false,
      showErrorModal: false,
      showDateValidationErrorModal: false,
    };
  }
  componentWillMount () {
  this.props.initialize({
    type: 'residential'
  });
}
  renderNameField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Name:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderDateField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Start Date:</label>
        <div className="col-sm-10">
        <input type="date" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderRetreatantCountField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Event Capacity:</label>
        <div className="col-sm-10">
        <input type="number" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderEventTypeField(field) {
    return (
      <div className="form-group row">
         <label className="col-sm-2 col-form-label">Event Type:</label>
         <div className="col-sm-10">
         <select className="form-control" {...field.input}>
           <option value="residential">Residential Retreat</option>
           <option value="day">Day Long</option>
           <option value="class">Class</option>
         </select>
         </div>
       </div>
    )
  }
  renderEndDateField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">End Date:</label>
        <div className="col-sm-10">
        <input type="date" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }

  onSubmit(values) {
    if (isDatePast(formatDisplayDateWithMoment(values.start_date))) {
      this.setState({ showDateValidationErrorModal: true })
      return false;
    }
    if (values.end_date && (isDatePast(values.end_date) || values.end_date<values.start_date)) {
      this.setState({ showDateValidationErrorModal: true })
      return false;
    }

    this.props.createEvent(values, (response) => {
      this.props.setActiveEvent(response._id)
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
        <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="type" component={this.renderEventTypeField} />
          <Field name="start_date" component={this.renderDateField} />
          <Field name="retreatant_count" component={this.renderRetreatantCountField} />
          {this.props.type !== 'day' ? <Field name="end_date" component={this.renderEndDateField} /> : null}
          <div className="button-row">
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
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
        <div>
          <SweetAlert
            show={this.state.showDateValidationErrorModal}
            title="Error"
            type="error"
            text="You cannot an event with a start date in the past, or an end date before the start date. Please correct the date and try again."
            onConfirm={() => this.setState({ showDateValidationErrorModal: false })}
          />
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    type: (formValueSelector('EventNewForm'))(state, 'type'),
  }
}
export default reduxForm({
  form: 'EventNewForm'
})(
  connect(mapStateToProps, { createEvent, setActiveEvent })(NewEvent)
);
