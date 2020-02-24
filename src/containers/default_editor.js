import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultPhaseDropdown from '../components/default_phase_dropdown.js';
import { fetchDefaultPhases, setActiveDefaultPhase } from '../actions';

class DefaultEditor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showRegistrationContent: false,
            showPreparationContent: false,
            showArrivalContent: false,
            showDuringContent: false,
            showClosingContent: false,
            showFollowUpContent: false,
        };
        this.toggleContent = this.toggleContent.bind(this);
    }
    componentDidMount() {
        this.props.fetchDefaultPhases(this.props.selectedDefault.id);
    }

    toggleContent(name) {
        let nameWithSpacesRemoved = name.replace(/\s/g, '');
        let show_field_name = `show${nameWithSpacesRemoved}Content`;
        this.setState({[show_field_name]: !this.state[show_field_name]})
    }

    typeNameMap() {
        return [{type:'residential',name:'Residential Retreat'}, {type: 'day', name: 'Day Long'}, {type: 'class', name: 'Class'}]
    }
    nameWithSpacesRemoved(name) {
        let nameWithSpacesRemoved = name.replace(/\s/g, '');
        let show_field_name = `show${nameWithSpacesRemoved}Content`;
        return show_field_name;
    }
    renderSelectOptions() {
        let types_with_defaults_set = [];
        for (let event_type of this.props.defaults) {
            if (event_type.type === 'residential') {
                types_with_defaults_set.push({name:'Retreat',type:event_type})
            } else if (event_type.type === 'class') {
                types_with_defaults_set.push({name:'Class',type:event_type})
            } else if (event_type.type === 'day') {
                types_with_defaults_set.push({name:"Day Long",type:event_type})
            }
        }
        return types_with_defaults_set.map((event_type, index) => {
            return (
                <option key={index} value={event_type.type}>{event_type.name}</option>
            );
        })
    }

    renderPhaseDropDowns() {
        return this.props.defaultPhases.map((phase) => {
            let stateShow = this.nameWithSpacesRemoved(phase.name)
            return (
                <DefaultPhaseDropdown
                    key={phase.name}
                    name={phase.name}
                    phaseId={phase._id}
                    defaultId={this.props.selectedDefault.id}
                    toggleContent={this.toggleContent}
                    show={this.state[stateShow]}/>
            );
        })
    }

    render() {
        console.log('default-editor props',this.props)
        return(

            <div className="default-settings">
                <h4>Event Defaults</h4>
                <div className="event-type-dropdown">
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Event Type:</label>
                        <div className="col-sm-8">
                            <select className="form-control">
                                {this.renderSelectOptions()}
                            </select>
                        </div>
                    </div>
                </div>
                {this.renderPhaseDropDowns()}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    defaultPhases: state.defaultPhases
});

export default connect(
    mapStateToProps, {fetchDefaultPhases, setActiveDefaultPhase}
)(DefaultEditor);
