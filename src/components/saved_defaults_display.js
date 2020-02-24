import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, createTask, createInstruction, fetchFiles, createEmail} from '../actions';

class SavedDefaultsDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            lastActiveDefaultPhase: this.props.selectedDefaultPhaseId,
        };
    }
    componentDidMount() {
        if (this.props.phaseId === this.props.selectedDefaultPhaseId) {
            this.props.fetchDefaultPhaseInstructions(this.props.phaseId);
            this.props.fetchDefaultPhaseEmails(this.props.phaseId);
            this.props.fetchDefaultPhaseTasks(this.props.phaseId);
        }
    }
    componentDidUpdate() {
        if((this.props.selectedDefaultPhaseId !== this.state.lastActiveDefaultPhase) && (this.props.phaseId === this.props.selectedDefaultPhaseId)  ) {
            this.props.fetchDefaultPhaseInstructions(this.props.phaseId);
            this.props.fetchDefaultPhaseEmails(this.props.phaseId);
            this.props.fetchDefaultPhaseTasks(this.props.phaseId);
            this.setState({ lastActiveDefaultPhase: this.props.selectedDefaultPhaseId })
        }
    }
    renderInstructionList() {
        if (this.props.selectedDefaultPhaseInstructions.length === 0) {
            return <div>You have no default instructions saved for this phase.</div>
        } else {
            return this.props.selectedDefaultPhaseInstructions.map((instruction) => {
                return (
                    <li className="list-group-item" key={instruction.id}>
                        <h6>{instruction.name}</h6>
                        <small>{instruction.content}
                        </small>
                    </li>
                );
            })
        }
    }
    renderTaskList() {
        if (this.props.selectedDefaultPhaseTasks.length === 0) {
            return <div>You have no default tasks saved for this phase.</div>
        }
        else {
            return this.props.selectedDefaultPhaseTasks.map((task) => {
                return (
                    <li className="list-group-item" key={task.id}>
                        <h6>{task.name}</h6>
                        <small>{task.content}
                        </small>
                    </li>
                );
            })
        }
    }
    renderEmails() {
        if (this.props.selectedDefaultPhaseEmails.length === 0) {
            return (
                <li className="list-group-item">
                    <h6>No Saved Emails</h6>
                    <small>There are no default emails saved for this phase.
                    </small>
                </li>
            );
        }

        return this.props.selectedDefaultPhaseEmails.map((email) => {
            return (
                <li className="list-group-item" key={email._id}>
                    <span> <strong>Name:</strong> {email.name}</span>
                    <span> <strong>Subject:</strong> {email.subject}</span>
                    <span><strong>Attached Files:</strong> Essential Retreat Information</span>
                    <div className="email-content-display">
                        Hi how are you this is an email
                    </div>
                </li>
            );
        })
    }
    render() {
        let total_items_in_phase = (this.props.selectedDefaultPhaseInstructions.length +
            this.props.selectedDefaultPhaseTasks.length +
            this.props.selectedDefaultPhaseEmails.length)
        return(
            <div className="saved-defaults">
                { total_items_in_phase === 0 &&
                <div>You do not have any default instructions, tasks, or emails saved for this phase.</div>
                }
                { total_items_in_phase > 0 &&
                <div>
                    <div className="task-group default-group">
                        <h5> Instructions </h5>
                        <ul className="list-group">
                            {this.renderInstructionList()}
                        </ul>
                    </div>
                    <div className="task-group default-group">
                        <h5> Tasks </h5>
                        <ul className="list-group">
                            {this.renderTaskList()}
                        </ul>
                    </div>
                    <div className="default-group">
                        <h5>Emails</h5>
                        <div className="">
                                {this.renderEmails()}
                        </div>
                    </div>
                </div>
                }
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        selectedDefaultPhaseId: state.selectedDefaultPhaseId,
        selectedDefaultPhaseInstructions: state.selectedDefaultPhaseInstructions,
        selectedDefaultPhaseTasks: state.selectedDefaultPhaseTasks,
        selectedDefaultPhaseEmails: state.selectedDefaultPhaseEmails,
    }
}
export default connect(mapStateToProps, { fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails })(SavedDefaultsDisplay)

