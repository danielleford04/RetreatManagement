import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';
import PropTypes from "prop-types";
import classnames from "classnames";

class Login extends Component {
  constructor() {
  super();
  this.state = {
    email: "",
    password: "",
    errors: {}
  };
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  renderPasswordField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Password:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderEmailField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email:</label>
        <div className="col-sm-10">
        <input type="email" className="form-control"  {...field.input}/>
        </div>
      </div>
    )
  }

  onSubmit(values) {
    values.event_id = this.props.activeEvent;
    this.props.login(values, () => {
      // this.setState({ showSuccessModal: true })},
      // () => {
      //   this.setState({ showErrorModal: true })

    });
  }


  render() {
    const { handleSubmit } = this.props;
    return(
      <div className="login-container">
        <div className="jumbotron">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="email" component={this.renderEmailField} />
          <Field name="password" component={this.renderPasswordField} />
          <div className="button-row">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authentication: state.authentication,
  errors: state.errors
});
export default reduxForm({
  form: 'LoginForm'
})(
  connect(mapStateToProps, { login })(Login)
);
