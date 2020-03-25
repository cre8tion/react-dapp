import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connection from './components/connection';
import {Form, Row, Col, Button} from 'react-bootstrap'
const { Zilliqa } = require('@zilliqa-js/zilliqa');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');


const { BN, units } = require('@zilliqa-js/util');
const { toBech32Address } = require('@zilliqa-js/crypto');

function App() {
  const [state, setState] = useState({});

  useEffect(() => {

    async function fetchdata(){
      const deployed = zilliqa.contracts.at("0x1843899294586A48C3DA9518037b3aBc8f44eD32");
      const state = await deployed.getState();
      console.log(state);
      console.log(JSON.stringify(state, null, 4));
    }

    fetchdata();

  })

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
            <Form.Group as={Row}>
              <Col>
                <Button type="submit">Vote</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>

        <Connection />
    </div>
  );
}

export default App;
