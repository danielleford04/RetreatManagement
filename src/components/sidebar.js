import React, { Component } from 'react';
import { connect } from 'react-redux';
import VerticalNavigation from '../containers/vertical_navigation.js';
import RetreatantsAndFormsButtons from '../components/side_bar_buttons.js';
import NewTasksAndEmails from '../components/new_tasks_div.js';
// import connect from "react-redux/src/components/connect";
import {fetchEvents, setActiveEvent} from "../actions";

class Sidebar extends Component {
  render() {
      if (this.props.activeEvent) {
          return (
              <div className="side-nav">
                  <VerticalNavigation/>
                  <RetreatantsAndFormsButtons/>
                  <NewTasksAndEmails/>
              </div>
          );
      } else {
          return (<div className="side-nav"></div>)
      }
  }
}

function mapStateToProps(state) {
    return {
        activeEvent: state.activeEvent,
    }
}

export default connect(mapStateToProps)(Sidebar);
