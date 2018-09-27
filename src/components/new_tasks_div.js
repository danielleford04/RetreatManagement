import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewTasksDiv extends Component {
  render() {
    return(
      <div>
        <a href="/create_task" type="button" className="btn btn-info btn-sm">New Task</a>
        <a href="/new_email" type="button"  className="btn btn-info btn-sm">New Email</a>
      </div>
    );
  }
}

export default NewTasksDiv;

//TODO - change anchors (here and elsewhere? to LINK tags - see 'retreatants_page')
