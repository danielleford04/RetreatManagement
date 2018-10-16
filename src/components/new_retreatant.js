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
    this.props.createRetreatant(values, () => {
      this.setState({ showSuccessModal: true })

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
        </div>
    );
  }
}

export default reduxForm({
  form: 'RetreatantsNewForm'
})(
  connect(null, { createRetreatant })(NewRetreatant)
);
