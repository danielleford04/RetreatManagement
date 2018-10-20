import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents, setActiveEvent } from '../actions';

class EventsNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    this.props.fetchEvents();
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }
  renderList() {
    return this.props.events.map((event) => {
      return (
        <li key={event._id} className="nav-item ">
          <Link className={"nav-link" + (event._id === this.props.activeEvent ? ' active' : '')}  onClick={() =>this.props.setActiveEvent(event._id)} to="/">{event.name}</Link>
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
