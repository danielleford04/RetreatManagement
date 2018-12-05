import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDisplayDateWithMoment } from '../global/utilities';
import { fetchEvents, setActiveEvent } from '../actions';

class AllEvents extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  onTableRowClick(id) {
    this.props.setActiveEvent(id)
    this.props.history.push('/')
  }

  renderList() {
    return this.props.futureEvents.map((event, index) => {
      return (
        <tr key={event._id} className="clickable" onClick={this.onTableRowClick.bind(this,event._id)}>
          <th scope="row">{index+1}</th>
          <td>{event.name}</td>
          <td>{event.type}</td>
          <td>{formatDisplayDateWithMoment(event.start_date)} {event.end_date ? ' - ' + formatDisplayDateWithMoment(event.end_date) : null}
</td>
        </tr>
      );
    })
  }

  render() {
    return (
      <div>
      <h3> Upcoming Events </h3>
      <Link to="/new_event" className="btn btn-primary">Add New Event</Link>
          <table className="table">
            <thead>
              <tr>
              <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Dates</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    futureEvents: state.futureEvents,
  }
}

export default connect(mapStateToProps, { fetchEvents, setActiveEvent })(AllEvents);
