import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, fetchFiles } from '../actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Field, formValueSelector, reduxForm} from "redux-form";
import SweetAlert from "sweetalert2-react";


class EmailDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            attachment_names: 'None',
            attachment_details: [],
            last_files: this.props.files,
            have_files_loaded: false,
            have_checked_attachments: false,
            is_editor_open: false,
            has_email_loaded: false,
            email: null,
            showErrorModal: false
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
        if((this.props.files.length !== this.state.last_files.length) || (this.state.email !== this.props.email )) {
            this.setState({ last_files: this.props.files })
            this.setState({ email: this.props.email })
            if (this.props.email.attachment && this.props.email.attachment.length > 0) {
                let attachments = [];
                let attachment_details = [];
                let attachments_string;
                for (let attachment_id of this.props.email.attachment) {
                    for (let file of this.props.files) {
                        if (attachment_id === file._id) {
                            attachments.push(file.name)
                            attachment_details.push({name: file.name, id: file._id})
                        }
                    }
                }
                attachments_string = attachments.join(", ");
                this.setState({ attachment_names: attachments_string })
                this.setState({ attachment_details: attachment_details})
            }
        }

        if(this.props.email.length !== 0 && !this.state.has_email_loaded) {
            this.setState({ has_email_loaded: true })
            this.props.initialize({
                subject: this.props.email.subject,
                body: this.props.email.body,
                name: this.props.email.name
            });
        }
    }

    toggleIsEditorOpen() {
        this.setState({is_editor_open: !this.state.is_editor_open})
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
    renderSubjectField(field) {
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

    renderFieldSelect ({ data }){
        if(data[0]._id !== null) {data.unshift({_id:null, name:"None"})}

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Add Attachment:</label>
                <div className="col-sm-9">
                    <Field
                        className="form-control"
                        name="attachment"
                        component="select">
                        {
                            data.map((form, index) => {
                                return (<option key={form._id} value={form._id}>{form.name}</option>)
                            })
                        }
                    </Field>
                </div>
            </div>
        )

    }

    renderNoFilesMessage() {
        return (
            <span>No files saved. Click 'new form' to upload a file.</span>
        );
    }

    renderSavedEmail(email) {
        return (
            <div>
                    <strong>{email.name}</strong> <FontAwesomeIcon icon="edit" onClick={this.toggleIsEditorOpen} />
                    <p><strong>Subject:</strong> {email.subject}</p>
                    <div className="email-content-display">
                        {email.body}
                    </div>
                    <p><strong>Attached Files:</strong> {this.state.attachment_names}</p>
            </div>
        )
    }

    renderSavedAttachments() {
        return this.state.attachment_details.map((attachment) => {
            return (
                <div className="saved-attachment" key={attachment.id}>
                    {attachment.name} <FontAwesomeIcon className="cancel-new-default" icon="times" onClick={()=>this.removeAttachment(attachment.id)}/>
                </div>
            );
        })
    }

    removeAttachment(attachment_to_remove) {
        let values = { email_id: this.props.email._id }

        let current_attachments = this.props.email.attachment;
        let updated_attachments = [];

        for (let attachment of current_attachments) {
            if (attachment !== attachment_to_remove) {
                updated_attachments.push(attachment)
            }
        }

        values.attachment = updated_attachments;

        this.props.updateEmail(values, () => {
                // this.setState({ showSuccessModal: true })
                console.log('success')
            },
            () => {
                this.setState({ showErrorModal: true })
            });
    }

    renderEmailEditor(email, files) {
        return (
            <div>

                <Field name="name" component={this.renderNameField} />
                <Field name="subject" component={this.renderSubjectField} />
                    <Field name="body" component={this.renderBodyField} />
                {email.attachment && email.attachment.length ? <div className="saved-attachment-container"><span>Attached Files:</span> {this.renderSavedAttachments()} </div> : null }
                {files.length ? <Field name="attachment" component={this.renderFieldSelect} data={files}/> : this.renderNoFilesMessage() }

                <div className="email-display-button-row"><button type="submit" className="btn btn-primary">Save Changes</button> <button type="submit" className="btn btn-secondary" onClick={this.toggleIsEditorOpen}>Cancel</button></div>

            </div>
        )
    }

    onSubmit(values) {
        values.email_id = this.props.email._id;
        if (values.attachment && this.props.files) {
            let attachments = [];
            attachments.push(values.attachment)
            for (let file of this.props.email.attachment) {

                attachments.push(file)
            }
            values.attachment = attachments;
        }

        this.props.updateEmail(values, () => {
                this.setState({ is_editor_open: false })
            },
            () => {
            this.setState({ showErrorModal: true })
            });
    }


    render() {
        const { handleSubmit } = this.props;
        console.log(this.props)
        return (
            <li className="list-group-item" key={this.props.email._id}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                {!this.state.is_editor_open ? this.renderSavedEmail(this.props.email) : this.renderEmailEditor(this.props.email, this.props.files)}
                </form>
                <div>
                    <SweetAlert
                        show={this.state.showErrorModal}
                        title="Error"
                        type="error"
                        text="There was an error saving your changes. Please try again."
                        onConfirm={() => this.setState({ showErrorModal: false })}
                    />
                </div>
            </li>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    files: state.files,
    type: (formValueSelector('EmailUpdateForm'))(state, 'type'),
    form: `EmailEditorForm-${ownProps.email._id}`
});

export default compose(
    connect(
        mapStateToProps, { fetchFiles, updateEmail }
    ),
    reduxForm({
        enableReinitialize: true,
        keepDirtyOnReinitialize : true
    })
)(EmailDisplay);
