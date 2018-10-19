import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewTasksDiv extends Component {
  render() {
    return(
      <div>
        <Link to="/create_task" type="button" className="btn btn-info btn-sm">New Task</Link>
        <Link to="/new_email" type="button"  className="btn btn-info btn-sm">New Email</Link>
      </div>
    );
  }
}

export default NewTasksDiv;
