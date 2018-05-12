import React, { Component } from 'react';

class SentEmail extends Component {
  render() {
    return(
      <div>
        <h3> Sent Email </h3>
        <h5> Sent: </h5>
        <p> 6/5/2017 </p>
        <h5> Subject: </h5>
        <p> Looking for Volunteers to Sleep in the Common Area</p>
        <div className="jumbotron">
        <p> Hello all, <br/> We are looking for 4 volunteers to sleep in the common area. <br/> Metta, <br/> Danielle</p>
        </div>
        <br/><br/>
        <h5>Sent to:</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark Otto</td>
              <td>motto@fake.fake</td>
            </tr>
            <tr>
              <td>Jacob T</td>
              <td>jtfake@gake.fake</td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>fakeemail@email.fake</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SentEmail;
