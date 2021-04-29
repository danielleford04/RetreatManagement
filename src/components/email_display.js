import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDefault, fetchFiles } from '../actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Field, formValueSelector, reduxForm} from "redux-form";


class EmailDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            attachment_names: 'None',
            last_files: this.props.files,
            have_files_loaded: false,
            have_checked_attachments: false,
            is_editor_open: false,
            has_email_loaded: false
        };
        this.toggleIsEditorOpen = this.toggleIsEditorOpen.bind(this);
    }

    componentDidMount() {
        if (this.props.files.length > 0){
            this.setState({ have_files_loaded: true })
        }
        if (this.state.have_files_loaded === false) {
            this.props.fetchFiles();
            this.setState({ have_files_loaded: true })
        }

    }
    componentDidUpdate() {
        if(this.props.files.length !== this.state.last_files.length) {
            this.setState({ last_files: this.props.files })
            if (this.props.email.attachment && this.props.email.attachment.length > 0) {
                let attachments = [];
                let attachments_string;
                for (let attachment_id of this.props.email.attachment) {
                    for (let file of this.props.files) {
                        if (attachment_id === file._id) {
                            attachments.push(file.file_name)
                        }
                    }
                }
                attachments_string = attachments.join(", ");
                this.setState({ attachment_names: attachments_string })
            }
        }

        if(this.props.email.length !== 0 && !this.state.has_email_loaded) {
            this.setState({ has_email_loaded: true })
            this.props.initialize({
                subject: this.props.email.subject,
                body: this.props.email.body
            });
        }
    }

    toggleIsEditorOpen() {
        this.setState({is_editor_open: !this.state.is_editor_open})
    }

    renderSubjectField(field) {
        console.log(field)
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Subject:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" {...field.input}/>
                </div>
            </div>
        )
    }

    renderBodyField(field) {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email Body:</label>
                <div className="col-sm-10">
                    <textarea className="form-control" {...field.input}/>
                </div>
            </div>
        )
    }

    onSubmit(values) {

        values.event_id = this.props.activeEvent;
        for (let phase of this.props.eventPhases) {
            if (phase.name === values.phase) {
                values.phase_id = phase._id;
            }
        }
        if(values.attachment=="None"){values.attachment=null}
        if(values.attachment && values.attachment !== null) {values.attachment=[values.attachment]}

        this.props.createEmail(values, () => {
                this.setState({ showSuccessModal: true })},
            () => {
                this.setState({ showErrorModal: true })

            });
    }


    render() {
        const { handleSubmit } = this.props;
        console.log('render',this.props.files)
        return (
            <li className="list-group-item" key={this.props.email._id}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <strong>{this.props.email.name}</strong> {!this.state.is_editor_open ? <FontAwesomeIcon icon="edit" onClick={this.toggleIsEditorOpen} /> : (<div><button type="submit" className="btn btn-primary">Save Changes</button> <FontAwesomeIcon icon="times" onClick={this.toggleIsEditorOpen}/></div>)}
                    {!this.state.is_editor_open ? <p><strong>Subject:</strong> {this.props.email.subject}</p> : <Field name="subject" placeholder={this.props.email.subject} component={this.renderSubjectField} /> }
                    {!this.state.is_editor_open ? <div className="email-content-display">
                        {this.props.email.body}
                    </div> : <Field name="body" component={this.renderBodyField} /> }
                    <p><strong>Attached Files:</strong> {this.state.attachment_names}</p>
                </form>
            </li>
        );
    }
}

const mapStateToProps = state => ({
    files: state.files,
    type: (formValueSelector('EmailUpdateForm'))(state, 'type'),
});

export default reduxForm({
    form: 'EmailUpdateForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize : true
}) (connect(
    mapStateToProps, { fetchFiles }
)(EmailDisplay));

