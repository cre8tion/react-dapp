import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connection from './components/connection';
import {Form} from 'react-bootstrap'


const { BN, units } = require('@zilliqa-js/util');
const { toBech32Address } = require('@zilliqa-js/crypto');

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
        <Connection />
    </div>
  );
}

export default App;
