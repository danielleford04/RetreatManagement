import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBarButtons extends Component {
  render() {
    return(
      <div>
        <Link type="button" to="/retreatants" className="btn btn-info btn-sm">Retreatants</Link>
        <Link type="button" to="/stored_forms" className="btn btn-info btn-sm">Stored Forms</Link>
      </div>
    );
  }
}

export default SideBarButtons;
