import React, { Component } from 'react';
import { connect } from 'react-redux';

class VerticalNavigation extends Component {
  renderList() {
    return this.props.eventTasks.map((eventTask) => {
      return (
        <li key={eventTask.name} className="nav-item">
          <a className="nav-link" href="/registration">{eventTask.name}</a>
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
    eventTasks: state.eventTasks
  }
}

export default connect(mapStateToProps)(VerticalNavigation);
