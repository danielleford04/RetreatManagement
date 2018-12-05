import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { returnFutureEvents } from '../global/utilities';
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
    return this.props.futureEvents.map((event) => {
      return (
        <li key={event._id} className="nav-item ">
          <Link className={"nav-link" + (event._id === this.props.activeEvent ? ' active' : '')}  onClick={() =>this.props.setActiveEvent(event._id)} to="/">{event.name}</Link>
        </li>
      );
    })
  }

  render() {
    return(
      <div>
      <div className="scroller scroller-right"><i className="glyphicon glyphicon-chevron-right"></i></div>
      <div className="scroller scroller-left"><i className="glyphicon glyphicon-chevron-left"></i></div>
      <div className="wrapper">
        <ul className="nav nav-tabs">
          {this.renderList()}
          <li className="nav-item" id="add-new-event">
            <Link to="/new_event" className="">
            <button className="btn btn-info">
              Add Event
              </button>
            </Link>
          </li>
        </ul>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEvent: state.activeEvent,
    futureEvents: state.futureEvents,
  }
}

export default connect(mapStateToProps, { fetchEvents, setActiveEvent })(EventsNavigation);
