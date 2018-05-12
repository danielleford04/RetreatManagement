import React, { Component } from 'react';
import VerticalNavigation from '../containers/vertical_navigation.js';
import RetreatantsButton from '../components/retreatants_button.js';
import SideBarButtons from '../components/side_bar_buttons.js';
import NewTasksDiv from '../components/new_tasks_div.js';

class SideBar extends Component {
  render() {
    return(
      <div className="side-nav">
        <VerticalNavigation />
        <SideBarButtons />
        <NewTasksDiv />
      </div>
    );
  }
}

export default SideBar;
