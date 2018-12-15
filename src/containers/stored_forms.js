import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDisplayDateWithMoment } from '../global/utilities';
import { fetchStoredForms } from '../actions';

class StoredForms extends Component {
  componentDidMount() {
    this.props.fetchStoredForms();
  }

  renderList() {
    return this.props.storedForms.map((storedForm) => {
      return (
        <tr key={storedForm._id} >
          <td>{storedForm.name}</td>
          <td>{formatDisplayDateWithMoment(storedForm.upload_date)}</td>
          <td>{storedForm.note}</td>
        </tr>
      );
    })
  }

  renderTable() {
    return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Date Uploaded</th>
          <th scope="col">Notes</th>
        </tr>
      </thead>
      <tbody>
        {this.renderList()}
      </tbody>
    </table>
  );
  }

  renderNoStoredFormsMessage() {
      return (
        <div>
          There are currently no saved files for this event.
          <Link to="new_form"> Upload a file.</Link>
        </div>
      );
  }

  render() {
    return(
      <div>
        <h3> Stored Forms </h3>
        <Link to="/new_form" className="btn btn-primary">Upload New Form</Link>
        {this.props.storedForms.length ? this.renderTable() : this.renderNoStoredFormsMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    storedForms: state.storedForms,
  }
}

export default connect(mapStateToProps, { fetchStoredForms })(StoredForms);
