import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDisplayDateWithMoment } from '../global/utilities';
// import { fetchEvents, setActiveEvent } from '../actions';

class EventsHome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      event: null,
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidMount() {
    if (this.props.activeEvent) {
      for (let event of this.props.events) {
        if (this.props.activeEvent === event._id) {
          this.setState({ event: event })
        }
      }
    }
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    // this.props.fetchEventRetreatants(this.props.activeEvent);
    for (let event of this.props.events) {
      if (this.props.activeEvent === event._id) {
        this.setState({ event: event })
      }
    }
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }

  renderEventDetails() {
    return(
    <div>
    <h3>{this.state.event.name}  </h3>
    <h5> {formatDisplayDateWithMoment(this.state.event.start_date)} {this.state.event.end_date ? ' - ' + formatDisplayDateWithMoment(this.state.event.end_date) : null}</h5>
    <h5>Event type: {this.state.event.type}</h5>
    <h5>Capacity: {this.state.event.retreatant_count}</h5>
    <p>maybe also: what phase currently in? upcoming to dos? number of retreatants signed up?</p>
</div>)
  }

  render() {
    return(
      <div>
      {this.state.event ? this.renderEventDetails() : <h5 className="welcome-message"> Welcome to (app name). You don't have any events saved. <Link to="new_event"> Create a new event.</Link></h5>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEvent: state.activeEvent,
  }
}

export default connect(mapStateToProps, null)(EventsHome);
