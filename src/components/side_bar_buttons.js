import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RetreatantsButton from '../components/retreatants_button.js';

class SideBarButtons extends Component {
  render() {
    return(
      <div>
        <RetreatantsButton />
        <Link type="button" to="/stored_forms" className="btn btn-info btn-sm">Stored Forms</Link>
      </div>
    );
  }
}

export default SideBarButtons;
