import React, { Component } from 'react';

class NewTask extends Component {
  render() {
    return(
      <div>
        <h3> Add a New Task </h3>
        <form>
        <div className="form-group">
        <label for="exampleSelect1">Task Category:</label>
        <select className="form-control" id="exampleSelect1">
          <option>Registration</option>
          <option>Preparation</option>
          <option>Arrival</option>
          <option>On Retreat</option>
          <option>Tear Down</option>
          <option>Follow Up</option>
        </select>
      </div> 
        Date due:
        <input type="date" className="form-control" /><br />
        Title:
        <input type="text" className="form-control" /> <br />
        Task: <br />
        <textarea className="form-control"/>
        <button type="submit" className="btn btn-primary">Create New Task</button>
      </form>
      <p>To Do: <br/>Date due OR how long in advance due <br/>Ability to add multiple tasks (checklist?)</p>
      </div>
    );
  }
}

export default NewTask;
