import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      //for/each set active event to state.event
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
    <h5> {this.state.event.start_date} </h5>
    <h5>{this.state.event.type}</h5>
    <p>idk. type? what phase currently in? upcoming to dos? </p>
</div>)
  }

  render() {
    return(
      <div>
      {this.state.event ? this.renderEventDetails() : <h3>No Event Selected</h3>}
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
