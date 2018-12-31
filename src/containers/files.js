import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDisplayDateWithMoment } from '../global/utilities';
import { fetchFiles } from '../actions';

class Files extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  renderList() {
    return this.props.files.map((file) => {
      return (
        <tr key={file._id} >
          <td>{file.name}</td>
          <td>{formatDisplayDateWithMoment(file.upload_date)}</td>
          <td>{file.note}</td>
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

  renderNoFilesMessage() {
      return (
        <div>
          There are currently no saved files for this event.
          <Link to="new_file"> Upload a file.</Link>
        </div>
      );
  }

  render() {
    return(
      <div>
        <h3> Files </h3>
        <Link to="/new_file" className="btn btn-primary">Upload New File</Link>
        {this.props.files.length ? this.renderTable() : this.renderNoFilesMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.files,
  }
}

export default connect(mapStateToProps, { fetchFiles })(Files);
