import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, register } from '../actions';
import classnames from "classnames";
import SweetAlert from "sweetalert2-react";

class Login extends Component {
  constructor() {
  super();
  this.state = {
    email: "",
    password: "",
    errors: {},
    register: false,
    showErrorModal: false,
    wereThereErrorsBeforeLastUpdate: false,
    errorMessage: ""
  };
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.authentication.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentDidUpdate() {
      if(this.state.wereThereErrorsBeforeLastUpdate === false && JSON.stringify(this.state.errors) !== '{}') {
          this.setState({showErrorModal: true});
          this.setState({wereThereErrorsBeforeLastUpdate: true});
          let objectIndex0 = Object.keys(this.state.errors)[0];
          this.setState({errorMessage: this.state.errors[Object.keys(this.state.errors)[0]]})
      }
    }


  renderPasswordField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Password:</label>
        <div className="col-sm-10">
        <input type="password" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
    renderPassword2Field(field) {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Confirm Password:</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" {...field.input}/>
                </div>
            </div>
        )
    }
  renderEmailField(field, errors) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email:</label>
          <span className="red-text">
                  {errors.email}
              {errors.emailnotfound}
                </span>
        <div className="col-sm-10">
        <input type="email"
               className="form-control"  {...field.input}
               className={classnames("form-control", {
                   invalid: errors.email || errors.emailnotfound
               })}
        />
        </div>
      </div>
    )
  }
    renderFirstNameField(field) {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">First Name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"  {...field.input}/>
                </div>
            </div>
        )
    }
    renderLastNameField(field) {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last Name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control"  {...field.input}/>
                </div>
            </div>
        )
    }

  onSubmit(values) {
      this.setState({wereThereErrorsBeforeLastUpdate: false});
      if(!this.state.register) {
          values.event_id = this.props.activeEvent;
          this.props.login(values, () => {

          });
      } else {
          values.event_id = this.props.activeEvent;
          this.props.register(values, () => {
          });
      }
  }

  render() {
    const { handleSubmit } = this.props;
      const register = this.state.register;
      const errors = this.state;
      let form;

      if (register) {
          form = <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name="email" component={this.renderEmailField(this.state.errors)} />
              <Field name="first_name" component={this.renderFirstNameField} />
              <Field name="last_name" component={this.renderLastNameField} />
              <Field name="password" component={this.renderPasswordField} />
              <Field name="password2" component={this.renderPassword2Field} />
              <div className="button-row">
                  <button onClick={() => this.setState({ register: false })} className="btn btn-secondary">Login</button>
                  <button type="submit" className="btn btn-primary">Register</button>
              </div>
          </form>
      } else {
          form = <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name="email" component={this.renderEmailField} />
              <Field name="password" component={this.renderPasswordField} />
              <div className="button-row">
                  <button type="submit" className="btn btn-primary">Login</button>
                  <button onClick={() => this.setState({ register: true })} className="btn btn-secondary">Register</button>
              </div>
          </form>
      }
    return(
      <div className="login-container">
        <div className="jumbotron">
            {form}
        </div>
          <div>
              <SweetAlert
                  show={this.state.showErrorModal}
                  title="Error"
                  type="error"
                  text={this.state.errorMessage}
                  onConfirm={() => this.setState({ showErrorModal: false })}
              />
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
  connect(mapStateToProps, { login, register })(Login)
);
