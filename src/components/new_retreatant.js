import React, { Component } from 'react';

class NewRetreatant extends Component {
  render() {
    return(
      <div>
        <h3> Add a New Retreatant </h3>
        <form>
        Name:
        <input type="text" className="form-control" /> <br />
        Email:
        <input type="email" className="form-control" /> <br />
        Notes: <br />
        <textarea className="form-control"/>
        <button type="submit" className="btn btn-primary">Add Retreatant</button>
      </form>
      </div>
    );
  }
}

export default NewRetreatant;
