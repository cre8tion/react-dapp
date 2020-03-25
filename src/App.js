import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connection from './components/connection';


const { BN, units } = require('@zilliqa-js/util');
const { toBech32Address } = require('@zilliqa-js/crypto');

function App() {
  const [state, setState] = useState({});


  return (
    <div className="App">
        <div className="col-lg-12">
        <h1 className="text-center">Election Results</h1>

        
        </div>
        <Connection />
    </div>
  );
}

export default App;
