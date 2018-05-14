import React, { Component } from 'react';
import { connect } from 'react-redux';

class VerticalNavigation extends Component {
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
    eventPhases: state.eventPhases
  }
}

export default connect(mapStateToProps)(VerticalNavigation);
