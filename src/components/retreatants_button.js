import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RetreatantsButton extends Component {
  render() {
    return(
      <div>
        <Link type="button" to="/retreatants" className="btn btn-info btn-sm">Retreatants</Link>
      </div>
    );
  }
}

export default RetreatantsButton;
