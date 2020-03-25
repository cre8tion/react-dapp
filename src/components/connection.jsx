import React, { useState, useEffect } from 'react';

const Connection = ({ children }) => {
  const [connected, setConnected] = useState(false);

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
          <p>Not connected</p>
          <button onClick={async () => {
            const isConnect = await window.zilPay.wallet.connect();
            setConnected(isConnect);
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