import React, { Component } from 'react';

class NewTasksDiv extends Component {
  render() {
    return(
      <div>
      <a href="create_task" type="button" className="btn btn-info btn-sm">Add New Task</a>
      <a type="button" href="/schedule_email" className="btn btn-info btn-sm">Send/Schedule<br/> New Email</a>
      </div>
    );
  }
}

export default NewTasksDiv;
