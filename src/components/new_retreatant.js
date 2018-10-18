import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { createRetreatant } from '../actions';

class NewRetreatant extends Component {
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
  renderEmailField(field) {
    return (
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" {...field.input}/>
      </div>
    )
  }
  renderNoteField(field) {
    return (
      <div className="form-group">
        <label>Notes:</label>
        <textarea className="form-control" {...field.input}/>
      </div>
    )
  }

  onSubmit(values) {
    values.event_id = this.props.activeEvent;
    this.props.createRetreatant(values, () => {
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
        <h3> Add a New Retreatant </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="email" component={this.renderEmailField} />
          <Field name="notes" component={this.renderNoteField} />
          <button type="submit" className="btn btn-primary">Add Retreatant</button>
        </form>
      </div>
        <div>
          <SweetAlert
            show={this.state.showSuccessModal}
            title="Success!"
            type="success"
            text="This retreatant was successfully added."
            onConfirm={() => this.props.history.push('/retreatants')}
          />
        </div>
        <div>
          <SweetAlert
            show={this.state.showErrorModal}
            title="Error"
            type="error"
            text="There was an error adding this retreatant. Please try again."
            onConfirm={() => this.setState({ showErrorModal: false })}
          />
        </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  }
}

export default reduxForm({
  form: 'RetreatantsNewForm'
})(
  connect(mapStateToProps, { createRetreatant })(NewRetreatant)
);
