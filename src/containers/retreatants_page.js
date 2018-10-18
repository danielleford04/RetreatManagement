import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRetreatants } from '../actions';

class RetreatantsPage extends Component {
  componentDidMount() {
    this.props.fetchRetreatants();
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

  render() {
    return (
      <div>
      <h3> Retreatants </h3>
      <Link to="/add_retreatant" className="btn btn-primary">Add New Retreatant</Link>
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
          <p>TODO:<br/>sample meal plan automatically done<br/>waitlist people<br/>keep track of $ or scholarships<br/>
              sweet alert for adding retreatants
              <br/>even if no sample meal plan done, place to enter people for meal plan, button that says finalize meal plan which allows app to send out
              <br /> delete retreatant
              </p>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    retreatants: state.retreatants
  }
}

export default connect(mapStateToProps, { fetchRetreatants })(RetreatantsPage);
