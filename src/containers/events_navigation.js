import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents, setActiveEvent } from '../actions';

class EventsNavigation extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  renderList() {
    return this.props.events.map((event) => {
      return (
        <li key={event._id} className="nav-item ">
          <a className={"nav-link" + (event._id === this.props.activeEvent ? ' active' : '')}  onClick={() =>this.props.setActiveEvent(event._id)} href="#">{event.name}</a>
        </li>
      );
    })
  }

  render() {
    return(
      <ul className="nav nav-tabs" >
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

export default connect(mapStateToProps, { fetchEvents, setActiveEvent })(EventsNavigation);
