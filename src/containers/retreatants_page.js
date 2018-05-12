import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';
import { connect } from 'react-redux';

class RetreatantsPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }
  renderList() {
    return this.props.retreatants.map((retreatant) => {
      return (
        <tr key={retreatant.name} >
          <th scope="row">1</th>
          <td>{retreatant.name}</td>
          <td>{retreatant.email}</td>
          <td></td>
        </tr>
      );
    })
  }

  render() {
    return(
      <div>

        <h3> Retreatants </h3>
        <button type="button" className="btn btn-primary" onClick={() => this.setState({ show: true })}>Add New Retreatant</button>
        <SweetAlert
          show={this.state.show}
          title="Add Retreatant"
          text="Add Name/Email Info Here"
          onConfirm={() => this.setState({ show: false })}
        />
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

        <p>TODO:<br/>count in table<br/>sample meal plan automatically done<br/>waitlist people<br/>keep track of $ or scholarships<br/>
        sweet alert for adding retreatants<br/>even if no sample meal plan done, place to enter people for meal plan, button that says finalize meal plan which allows app to send out</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    retreatants: state.retreatants
  }
}

export default connect(mapStateToProps)(RetreatantsPage);
