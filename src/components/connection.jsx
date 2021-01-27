import React, { useState, useEffect } from 'react';

const Connection = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Not connected")

  useEffect(() => {
    let didCancel = false;

    (async () => {
      if (window.zilPay !== undefined){
        const isConnect = await window.zilPay.wallet.connect();
        if (!didCancel) setConnected(isConnect);
      }

    })();

    return () => { didCancel = true; }
  });

  return (
    <React.Fragment>
      {!connected && (
        <React.Fragment>
          <p>{status}</p>
          <button onClick={async () => {
            try{
              if (window.zilPay !== undefined){
                const isConnect = await window.zilPay.wallet.connect();
                setConnected(isConnect);
              }
              else{
                setStatus("Please install Zilpay Wallet on Browser")
              }
            } catch(e){
                setStatus("Unexpected error occurred")
              }
            }}>Connect Wallet</button>
        </React.Fragment>
      )}
      {connected && window.zilPay.wallet.isEnable && (
        <React.Fragment>
          <p>Connected as: {window.zilPay.wallet.defaultAccount && window.zilPay.wallet.defaultAccount.bech32}</p>
          <hr />
          {children}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Connection;