import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SavedDefaultsDisplay from '../components/saved_defaults_display.js';
import { fetchConfirmationEmail, setActiveDefaultPhase, fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, createDefaultTask, createDefaultInstruction, fetchFiles, createDefaultEmail } from '../actions';
import SweetAlert from "sweetalert2-react";
import EmailDisplay from "./email_display";

class ConfirmationEmailEditor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showEditor: false,
            showErrorModal: false,
        };
        this.toggleEditor = this.toggleEditor.bind(this);
        this.hideAddDefaultAndClearForm = this.hideAddDefaultAndClearForm.bind(this);
    }
    componentWillMount () {
        this.props.initialize({
            selectedType: 'instruction'
        });
    }
    componentDidMount() {
        this.props.fetchConfirmationEmail(this.props.selectedDefault);
    }
    toggleEditor () {
        this.setState({showEditor: !this.state.showEditor})
    }

    renderNameField(field) {
        return (
            <div className="form-group">
                <input type="text" className="form-control" {...field.input} placeholder="Name"/>
            </div>
        )
    }
    renderDescriptionField(field) {
        return (
            <div className="form-group description-field">
                <input type="text" className="form-control" {...field.input} placeholder="Description"/>
            </div>
        )
    }
    renderDueDateField(field) {
        return (
            <div className="form-group due-date-field">
                <input type="number" placeholder="Due Date" className="form-control" {...field.input}/>
            </div>
        )
    }
    renderSubjectField(field) {
        return (
            <div className="form-group subject-field">
                <input type="text" className="form-control" {...field.input} placeholder="Subject"/>
            </div>
        )
    }
    renderBodyField(field) {
        return (
            <div className="form-group email-body-field">
                <textarea className="form-control" {...field.input} placeholder="Email body"/>
            </div>
        )
    }
    hideAddDefaultAndClearForm(){
        this.props.reset();
        this.setState({showAddDefault: false})
    }
    onSubmit(values) {
        values.phase_id = this.props.phaseId;
        if (this.state.selectedType === "task") {
            if (values.name ===undefined || values.content === undefined || values.default_due_date === undefined) {
                this.setState({ showErrorModal: true })
                return;
            } else {
                this.props.createDefaultTask(values, () => {
                    this.props.reset();
                    this.setState({showAddDefault: false});

                });
            }
        } else if (this.state.selectedType === "instruction") {
            if (values.name ===undefined || values.content === undefined) {
                this.setState({ showErrorModal: true })
                return;
            } else {
                this.props.createDefaultInstruction(values, () => {
                    this.props.reset();
                    this.setState({showAddDefault: false});

                });
            }
        } else if (this.state.selectedType === "email") {
            if (values.name ===undefined || values.subject === undefined || values.body === undefined) {
                this.setState({ showErrorModal: true })
                return;
            } else {
                values.event_id = this.props.defaultId;
                this.props.createDefaultEmail(values, () => {
                    this.props.reset();
                    this.setState({showAddDefault: false});

                });
            }
        }


    }
    render() {
        const { handleSubmit } = this.props;

        return(
            <div className="phase-defaults">
                <div className="phase-title">
                    <button className="btn btn-link" type="button" onClick={this.toggleEditor}>
                        Confirmation Email
                        <FontAwesomeIcon icon={(this.state.showEditor ? "angle-up" : "angle-down")} />
                    </button>
                </div>
                <div className={"collapsable" + (this.state.showEditor ? " show" : '')}>
                    <p>This email is automatically sent to any attendee when they are added to the attendee list for this event.</p>
                    <EmailDisplay email={this.props.confirmationEmail}/>
                </div>
                <div>
                    <SweetAlert
                        show={this.state.showErrorModal}
                        title="Error"
                        type="error"
                        text="Please complete all fields."
                        onConfirm={() => this.setState({ showErrorModal: false })}
                    />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        type: (formValueSelector('UpdateDefaultForm'))(state, 'selectedType'),
        selectedDefaultPhaseId: state.selectedDefaultPhaseId,
        confirmationEmail: state.confirmationEmail
    }
}
export default reduxForm({
    form: 'UpdateDefaultForm'
})(
    connect(mapStateToProps, {  fetchConfirmationEmail, createDefaultInstruction, fetchFiles, createDefaultEmail })(ConfirmationEmailEditor)
);
