import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, deleteInstruction, deleteTask, deleteEmail} from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SavedDefaultsDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.deleteInstruction = this.deleteInstruction.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentDidMount() {
        if (this.props.phaseId === this.props.selectedDefaultPhaseId) {

            this.props.fetchDefaultPhaseInstructions(this.props.phaseId);
            this.props.fetchDefaultPhaseEmails(this.props.phaseId);
            this.props.fetchDefaultPhaseTasks(this.props.phaseId);
        }
    }
    componentDidUpdate() {
        if((this.props.selectedDefaultPhaseId !== this.props.lastActiveDefaultPhase) && (this.props.phaseId === this.props.selectedDefaultPhaseId)  ) {
            this.props.fetchDefaultPhaseInstructions(this.props.phaseId);
            this.props.fetchDefaultPhaseEmails(this.props.phaseId);
            this.props.fetchDefaultPhaseTasks(this.props.phaseId);
            this.props.updateLastActiveDefaultPhase(this.props.selectedDefaultPhaseId);
        }
    }
    renderInstructionList() {
        if (this.props.selectedDefaultPhaseInstructions.length === 0) {
            return <div>You have no default instructions saved for this phase.</div>
        } else {
            return this.props.selectedDefaultPhaseInstructions.map((instruction) => {
                return (
                    <li className="list-group-item" key={instruction._id}>

                            <h6 className="default-task-title">{instruction.name}</h6>
                            <p className="small default-task-description">{instruction.content}
                            </p>
                            <FontAwesomeIcon icon="times" className="close-icon" onClick={()=>this.deleteInstruction(instruction._id)}/>

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
                    <li className="list-group-item" key={task._id} >
                        <div>
                            <h6 className="default-task-title">{task.name}</h6>
                            <p className="small default-task-description">{task.content}
                            </p>
                        </div>
                        <FontAwesomeIcon icon="times" className="close-icon" onClick={()=>this.deleteTask(task._id)}/>
                    </li>
                );
            })
        }
    }
    deleteTask(task_id){
        this.props.deleteTask(task_id, () => {
            this.props.fetchDefaultPhaseTasks(this.props.phaseId);
        });
    }
    deleteInstruction(instruction_id){
        this.props.deleteInstruction(instruction_id, () => {
            this.props.fetchDefaultPhaseInstructions(this.props.phaseId);
        });
    }
    deleteEmail(email_id){
        this.props.deleteEmail(email_id, () => {
            this.props.fetchDefaultPhaseEmails(this.props.phaseId);
        });
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
                <li className="list-group-item" key={email._id} >
                    <span> <strong>Name:</strong> {email.name}</span>
                    <span> <strong>Subject:</strong> {email.subject}</span>
                    <span><strong>Attached Files:</strong> Essential Retreat Information</span>
                    <FontAwesomeIcon icon="times" className="close-icon" onClick={()=>this.deleteEmail(email._id)}/>
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
            this.props.selectedDefaultPhaseEmails.length);
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
export default connect(mapStateToProps, { fetchDefaultPhaseInstructions, fetchDefaultPhaseTasks, fetchDefaultPhaseEmails, deleteInstruction, deleteTask, deleteEmail })(SavedDefaultsDisplay)

