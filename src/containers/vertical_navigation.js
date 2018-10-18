import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEventPhases } from '../actions';

class VerticalNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastActiveEvent: this.props.activeEvent,
    };
  }
  componentDidUpdate() {
    if((this.props.activeEvent !== this.state.lastActiveEvent)  ) {
    this.props.fetchEventPhases(this.props.activeEvent);
      this.setState({ lastActiveEvent: this.props.activeEvent })
  }
  }
  renderList() {
    return this.props.eventPhases.map((eventPhase) => {
      return (
        <li key={eventPhase.name} className="nav-item">
          <a className="nav-link" href="/registration">{eventPhase.name}</a>
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
  }
}

export default connect(mapStateToProps, { fetchEventPhases })(VerticalNavigation);
