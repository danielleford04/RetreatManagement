import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDefault } from '../actions';


class setDefaultsControl extends Component {
    eventTypesSet() {
        let event_types_set = [];

        for (let default_settings of this.props.defaults) {
            event_types_set.push(default_settings.type)
        }
        return event_types_set;
    }
    defaultsToSetMessage () {
        let defaultsMessage = "You do not have any defaults set.";
        let user_defaults = this.props.defaults;

        let event_types_set = [];

        for (let event_type in this.eventTypesSet()) {
            if (event_type = "residential") {
                event_types_set.push("residential retreats")
            } else if (event_type = "class") {
                event_types_set.push("classes")
            } else {
                event_types_set.push("day longs")
            }
        }

        if (user_defaults.length === 1) {
            defaultsMessage = `You have defaults set for ${event_types_set[0]}.`;
        } else if (user_defaults.length === 2 ){
            defaultsMessage = `You have defaults set for ${event_types_set[0]} and ${event_types_set[1]}.`;
        } else if (user_defaults.length === 3) {
            defaultsMessage = `You have defaults set for ${event_types_set[0]}, ${event_types_set[1]} and ${event_types_set[2]}.`;
        }

        return defaultsMessage;
    }

    typesWithoutDefaults() {
        let all_event_types = ['residential', 'day', 'class'];
        let event_types_not_set = [];

        for (let event_type of all_event_types) {
            if (this.eventTypesSet().indexOf(event_type) === -1) {
                event_types_not_set.push(event_type)
            }
        }

        return event_types_not_set;
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


    renderButtons() {
        let types_formatted_for_button_text = [];
        for (let event_type of this.typesWithoutDefaults()) {
            if (event_type === 'residential') {
                types_formatted_for_button_text.push({name:'Retreat',type:event_type})
            } else if (event_type === 'class') {
                types_formatted_for_button_text.push({name:'Class',type:event_type})
            } else if (event_type === 'day') {
                types_formatted_for_button_text.push({name:"Day Long",type:event_type})
            }
        }
        return types_formatted_for_button_text.map((event_type, index) => {
            return (
                <button key={index} onClick={this.createDefaults.bind(this,event_type.type)} className="btn btn-primary create-defaults-button">Create {event_type.name} Defaults</button>
            );
        })
    }

    render() {
        return(
            <div className="create-defaults-div">
                <div>{this.defaultsToSetMessage()}</div>
                {this.renderButtons()}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(
    mapStateToProps, { createDefault }
)(setDefaultsControl);

