import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventsNavigation from '../containers/events_navigation.js';
import SideBar from '../components/sidebar_div.js';
import SelectedContent from '../components/selected_content.js';
import RetreatantsPage from '../containers/retreatants_page.js';
import Registration from '../components/registration.js';
import NewEmail from '../components/new_email.js';
import ScheduledEmail from '../components/scheduled_email.js';
import StoredForms from '../containers/stored_forms.js';
import NewForm from '../components/new_form.js';
import NewTask from '../components/new_task.js';
import NewRetreatant from '../components/new_retreatant.js';
import NewEvent from '../components/new_event.js';
import SentEmail from '../components/sent_email.js';
import TwoWeeksOut from '../components/two_weeks_out.js';
import OneWeekOut from '../components/one_week_out.js';

class MainContent extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="main-content">
          <EventsNavigation />
          <Switch>
            <Route path="/retreatants" component={RetreatantsPage} />
            <Route path="/add_retreatant" component={NewRetreatant} />
            <Route path="/registration" component={Registration} />
            <Route path="/stored_forms" component={StoredForms} />
            <Route path="/new_form" component={NewForm} />
            <Route path="/new_email" component={NewEmail} />
            <Route path="/scheduled_email" component={ScheduledEmail} />
            <Route path="/sent_email" component={SentEmail} />
            <Route path="/create_task" component={NewTask} />
            <Route path="/new_event" component={NewEvent} />
            <Route path="/two_weeks_out" component={TwoWeeksOut} />
            <Route path="/one_week_out" component={OneWeekOut} />
            <Route path="/" component={SelectedContent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContent;
