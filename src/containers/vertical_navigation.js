import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEventPhases, setActivePhase } from '../actions';

class VerticalNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    this.props.fetchEventPhases(this.props.activeEvent, this.props.events);
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }
  renderList() {
    return this.props.eventPhases.map((phase) => {
      return (
        <li key={phase.name} className="nav-item">
          <Link className="nav-link " onClick={() =>this.props.setActivePhase(phase._id)} to="/instructions">{phase.name}</Link>
        </li>
      );
    })
  }

  render() {
    return(
      <ul className="nav flex-column">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  //whatever is returned will show up as props inside of verticalnavigation
  return {
    eventPhases: state.eventPhases,
    activeEvent: state.activeEvent,
    activePhase: state.activePhase,
    events: state.events,
  }
}

export default connect(mapStateToProps, { fetchEventPhases, setActivePhase })(VerticalNavigation);
