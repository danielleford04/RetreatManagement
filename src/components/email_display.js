import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDefault, fetchFiles } from '../actions';


class EmailDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            attachment_names: 'None',
            last_files: this.props.files,
            have_files_loaded: false,
            have_checked_attachments: false
        };
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
    }

    createDefaults(type) {
        this.props.createDefault({'type':type}, (response) => {
                //commented out - to be used if decide to add success/error alert
                // this.props.setActiveEvent(response._id)
                // this.setState({ showSuccessModal: true })
                // },
                // () => {
                //     this.setState({ showErrorModal: true })
            }
        );
    }


    render() {
        console.log('render',this.props.files)
        return (
            <li className="list-group-item" key={this.props.email._id}>
                <strong>{this.props.email.name}</strong>
                <p><strong>Subject:</strong> {this.props.email.subject}</p>
                <div className="email-content-display">
                    {this.props.email.body}
                </div>
                <p><strong>Attached Files:</strong> {this.state.attachment_names}</p>
            </li>
        );
    }
}

const mapStateToProps = state => ({
    files: state.files,
});

export default connect(
    mapStateToProps, { createDefault, fetchFiles }
)(EmailDisplay);

