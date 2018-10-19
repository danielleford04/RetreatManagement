import React, { Component } from 'react';
import VerticalNavigation from '../containers/vertical_navigation.js';
import RetreatantsAndFormsButtons from '../components/side_bar_buttons.js';
import NewTasksAndEmails from '../components/new_tasks_div.js';

class Sidebar extends Component {
  render() {
    return(
      <div className="side-nav">
        <VerticalNavigation />
        <RetreatantsAndFormsButtons />
        <NewTasksAndEmails />
      </div>
    );
  }
}

export default Sidebar;
