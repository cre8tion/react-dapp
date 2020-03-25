import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connection from './components/connection';
import CandidateTable from './components/candidateTable';
import {Form, Row, Col, Button} from 'react-bootstrap'

const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion);

const myGasPrice = units.toQa('1000', units.Units.Li);

// To replace for different contracts
const contractAddress = "0x2823f0aA57c58A55323dd6Ec08Db7E8a0EE695b3"

function App() {
  const [state, setState] = useState({});
  const [candidate1Votes, setCandidate1Votes] = useState(0);
  const [candidate2Votes, setCandidate2Votes] = useState(0);
  const vote = useRef(null);

  async function fetchData(){
    const deployed = zilliqa.contracts.at(contractAddress);
    const state = await deployed.getState();
    setCandidate1Votes(state.candidate1)
    setCandidate2Votes(state.candidate2)
    console.log(JSON.stringify(state, null, 4));
  }

  async function submitVote(){
    try{
      let candidate = parseInt(vote.current.value);
      console.log(candidate)
      const deployed = window.zilPay.contracts.at(contractAddress);
      await window.zilPay.wallet.connect();
      const walletAddress = window.zilPay.wallet.defaultAccount.base16;
      console.log(walletAddress)
      const txn = await deployed.call(
        'Vote',
        [        
          {
            vname: 'candidate',
            type: 'Uint32',
            value: `${candidate}`,
          },
          {
            vname: 'voterAdd',
            type: 'ByStr20',
            value: `${walletAddress}`,
          }
        ],
        {
          version: VERSION,
          amount: new BN(0),
          gasPrice: myGasPrice,
          gasLimit: Long.fromNumber(8000),
        },
      );
      console.log(txn)
      
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    async function fetchdata(){
      const deployed = zilliqa.contracts.at(contractAddress);
      const state = await deployed.getState();
      // To update UI
      setCandidate1Votes(state.candidate1)
      setCandidate2Votes(state.candidate2)
      console.log(JSON.stringify(state, null, 4));
    }
    fetchdata();

    const interval = setInterval(() => {
      console.log('Refreshing Candidate Votes');
      fetchdata();
    }, 60000);
    
    return () => clearInterval(interval);
  })

  return (
    <div className="App">
        <div className="col-lg-12">
          <h1>Election Results</h1>
        </div>
        <br/>
        <div>
          <CandidateTable candidate1Votes={candidate1Votes} candidate2Votes={candidate2Votes}/>
          <br/>
          <Form>
            <Form.Group controlId="candidateForm">
              <Form.Label>Select Candidate</Form.Label>
              <Form.Control as="select" ref={vote}>
                <option value="1">Candidate 1</option>
                <option value="2">Candidate 2</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Row>
            <Col>
              <Button onClick={submitVote} className="btn btn-primary">Vote</Button>
            </Col>
            <Col>
              <Button onClick={fetchData} className="btn btn-primary">Refresh Vote</Button>
            </Col>
          </Row>
        </div>
        <br/>
        <Connection />
    </div>
  );
}

export default App;
