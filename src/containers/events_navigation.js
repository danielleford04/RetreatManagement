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
    //     var now = new Date().toISOString();
    //     var futureEvents = [];
    //
    //     for (let event of this.props.events) {
    //       if (event.start_date > now) {
    //         futureEvents.push(event)
    //       }
    //     }
    //     var futureEventsSorted = futureEvents.sort(function(a, b) {
    //     var keyA = new Date(a.start_date),
    //         keyB = new Date(b.start_date);
    //     // Compare the 2 dates
    //     if(keyA < keyB) return -1;
    //     if(keyA > keyB) return 1;
    //     return 0;
    // });
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
