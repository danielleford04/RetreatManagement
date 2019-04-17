import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventsNavigation from '../containers/events_navigation.js';
import Sidebar from '../components/sidebar.js';
import EventHome from '../containers/event_home.js';
import AllEvents from '../containers/all_events.js';
import RetreatantsPage from '../containers/retreatants_page.js';
import Registration from '../components/registration.js';
import NewEmail from '../components/new_email.js';
import ScheduledEmail from '../components/scheduled_email.js';
import Files from '../containers/files.js';
import NewForm from '../components/new_file.js';
import NewTask from '../components/new_task.js';
import NewRetreatant from '../components/new_retreatant.js';
import NewEvent from '../components/new_event.js';
import SentEmail from '../components/sent_email.js';
import PhaseInstructions from '../containers/phase.js';
import UserOverlay from '../containers/user_overlay.js';

class MainContent extends Component {
  render() {
    return(
      <div className="main-container">
        <Sidebar />
        <div className="main-content">
          <EventsNavigation />
          <Switch>
            <Route path="/retreatants" component={RetreatantsPage} />
            <Route path="/add_retreatant" component={NewRetreatant} />
            <Route path="/registration" component={Registration} />
            <Route path="/files" component={Files} />
            <Route path="/new_file" component={NewForm} />
            <Route path="/new_email" component={NewEmail} />
            <Route path="/scheduled_email" component={ScheduledEmail} />
            <Route path="/sent_email" component={SentEmail} />
            <Route path="/new_task" component={NewTask} />
            <Route path="/new_event" component={NewEvent} />
            <Route path="/all_events" component={AllEvents} />
            <Route path="/instructions" component={PhaseInstructions} />
            <Route path="/user" component={UserOverlay} />
            <Route path="/" component={EventHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MainContent;
