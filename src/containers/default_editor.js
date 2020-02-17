import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultPhaseDropdown from '../components/default_phase_dropdown.js';
// import { fetchDefaults } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            // showErrorModal: false,
            // showDateValidationErrorModal: false,
        };
        this.toggleContent = this.toggleContent.bind(this);
    }
    componentDidMount() {
        // this.props.fetchDefaults(this.props.user._id);
    }
    toggleContent(name) {
        let nameWithSpacesRemoved = name.replace(/\s/g, '');
        let show_field_name = `show${nameWithSpacesRemoved}Content`;
        this.setState({[show_field_name]: !this.state[show_field_name]})
    }

    // stopPropagation(e) {
    //     e.stopPropagation();
    // };
    typeNameMap() {
        return [{type:'residential',name:'Residential Retreat'}, {type: 'day', name: 'Day Long'}, {type: 'class', name: 'Class'}]
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
                <DefaultPhaseDropdown
                    name="Registration"
                    toggleContent={this.toggleContent}
                    show={this.state.showRegistrationContent}/>
                <DefaultPhaseDropdown
                    name="Preparation"
                    toggleContent={this.toggleContent}
                    show={this.state.showPreparationContent}/>
                <DefaultPhaseDropdown
                    name="Arrival"
                    toggleContent={this.toggleContent}
                    show={this.state.showArrivalContent}/>
                <DefaultPhaseDropdown
                    name="During"
                    toggleContent={this.toggleContent}
                    show={this.state.showDuringContent}/>
                <DefaultPhaseDropdown
                    name="Closing"
                    toggleContent={this.toggleContent}
                    show={this.state.showClosingContent}/>
                <DefaultPhaseDropdown
                    name="Follow Up"
                    toggleContent={this.toggleContent}
                    show={this.state.showFollowUpContent}/>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    // defaults: state.defaults
});
// export default connect(
//   mapStateToProps, { fetchDefaults }
// )(UserOverlay);
export default connect(
    mapStateToProps, null
)(DefaultEditor);
