import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connection from './components/connection';
import {Form, Table} from 'react-bootstrap'


const { BN, units } = require('@zilliqa-js/util');
const { toBech32Address } = require('@zilliqa-js/crypto');
var candidate1_votes=0;
var candidate2_votes=0;

function App() {
  const [state, setState] = useState({});
  


  return (
    <div className="App">
        <div className="col-lg-12">
        <h1 className="text-center">Election Results</h1>

        
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Candidate</Form.Label>
            <Form.Control as="select">
              <option>Candidate 1</option>
              <option>Candidate 2</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <form onSubmit="">
              <div class="form-group">
                <label for="candidatesSelect">Select Candidate</label>
                <select class="form-control" id="candidatesSelect">
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Vote</button>
              <hr />
        </form>
        </div>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Votes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Candidate 1</td>
      <td>{candidate1_votes}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Candidate 2</td>
      <td>{candidate2_votes}</td>
    </tr>
  </tbody>
</Table>
<button type="submit" class="btn btn-primary">Refresh Vote</button>
        <Connection />
    </div>
  );
}

export default App;
