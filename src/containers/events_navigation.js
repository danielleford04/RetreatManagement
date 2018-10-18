import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../actions';

class EventsNavigation extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  // TODO: need to figure out how to make on the active page tab active
  //(conditional styling in tutorial?), and style add new event (plus wire in)
  renderList() {
    return this.props.events.map((event) => {
      return (
        <li key={event._id} className="nav-item ">
          <a className="nav-link active" href="#">{event.name}</a>
        </li>
      );
    })
  }

  render() {
    console.log(3, this.props)
    return(
      <ul className="nav nav-tabs">
        {this.renderList()}

        <li className="nav-item" id="add-new-event">
          <Link to="/new_event" className="nav-link">
            New Event
          </Link>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEvent: state.activeEvent,
  }
}

export default connect(mapStateToProps, { fetchEvents })(EventsNavigation);
// export default connect(mapStateToProps)(EventsNavigation);
