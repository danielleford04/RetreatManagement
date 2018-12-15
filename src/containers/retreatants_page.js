import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEventRetreatants } from '../actions';

class RetreatantsPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidMount() {
    if (this.props.activeEvent) {
      this.props.fetchEventRetreatants(this.props.activeEvent);
    }
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    this.props.fetchEventRetreatants(this.props.activeEvent);
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }

  renderList() {
    return this.props.retreatants.map((retreatant, index) => {
      return (
        <tr key={retreatant.email} >
          <th scope="row">{index+1}</th>
          <td>{retreatant.name}</td>
          <td>{retreatant.email}</td>
          <td>{retreatant.notes}</td>
        </tr>
      );
    })
  }

  renderTable() {
    return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Meal Notes</th>
        </tr>
      </thead>
      <tbody>
        {this.renderList()}
      </tbody>
    </table>
  );
  }

  renderNoRetreatantMessage() {
      return (
        <div>
          There are currently no retreatants registered for this event.
        </div>
      );
  }

  renderEventCapacity() {
    if(this.props.activeEvent) {
      for (let event of this.props.events) {
        if (event._id === this.props.activeEvent) {
          return event.retreatant_count;
        }
      }
    } else {
      return "Loading..."
    }
  }

  render() {
    return (
      <div>
      <h3> Retreatants </h3>
      <div>
      <strong> Event Capacity: </strong><small>{this.renderEventCapacity()}</small>
      </div>
      <Link to="/add_retreatant" className="btn btn-primary">Add New Retreatant</Link>
      {this.props.retreatants.length ? this.renderTable() : this.renderNoRetreatantMessage()}


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    retreatants: state.retreatants,
    activeEvent: state.activeEvent,
    events: state.events,
  }
}

export default connect(mapStateToProps, { fetchEventRetreatants })(RetreatantsPage);
