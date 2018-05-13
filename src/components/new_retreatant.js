import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createRetreatant } from '../actions';

class NewRetreatant extends Component {
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
        <input type="textarea" className="form-control" {...field.input}/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createRetreatant(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3> Add a New Retreatant </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="name" component={this.renderNameField} />
          <Field name="email" component={this.renderEmailField} />
          <Field name="note" component={this.renderNoteField} />
          <button type="submit" className="btn btn-primary">Add Retreatant</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'RetreatantsNewForm'
})(
  connect(null, { createRetreatant })(NewRetreatant)
);
