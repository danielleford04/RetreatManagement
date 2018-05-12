import React, { Component } from 'react';
import RetreatantsButton from '../components/retreatants_button.js';

class SideBarButtons extends Component {
  render() {
    return(
      <div>
        <RetreatantsButton />
        <a type="button" href="/stored_forms" className="btn btn-info btn-sm">Stored Forms</a>
      </div>
    );
  }
}

export default SideBarButtons;
