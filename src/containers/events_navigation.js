import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventsNavigation extends Component {
  // TODO: need to figure out how to make on the active page tab active
  renderList() {
    return this.props.events.map((event) => {
      return (
        <li key={event.name} className="nav-item ">
          <a className="nav-link active" href="#">{event.name}</a>
        </li>
      );
    })
  }

  render() {
    return(
      <ul className="nav nav-tabs">
        {this.renderList()}

        <li className="nav-item" id="add-new-event">
          <a className="nav-link" href="#">Add New Event</a>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(EventsNavigation);
