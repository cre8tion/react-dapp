require('dotenv').config();

const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

// These are set by the core protocol, and may vary per-chain.
// You can manually pack the bytes according to chain id and msg version.
// For more information: https://apidocs.zilliqa.com/?shell#getnetworkid

const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion);
const myGasPrice = units.toQa('1000', units.Units.Li);


zilliqa.wallet.addByPrivateKey(process.env.PRIVATE_KEY);
const address = getAddressFromPrivateKey(process.env.PRIVATE_KEY);

console.log(address)

const code = `
scilla_version 0

import BoolUtils

library Voting 

let one = Uint32 1
let zero = Uint32 0
let two = Uint32 2
(*let true = Bool True*)

contract Voting
(
    owner : ByStr20
)

field voters : Map ByStr20 Uint32 = Emp ByStr20 Uint32
field candidate1 : Uint32 = Uint32 0
field candidate2 : Uint32 = Uint32 0

transition Vote(candidate : Uint32, voterAdd: ByStr20)
    has_voted <- exists voters[voterAdd];
(*    has_voted = builtin contains voters voterAdd; *)
    match has_voted with 
    | True => 
        e = { _exception : "Voted twice"; message : "You have voted twice" };
        throw e
    | False => 
(*        voters[voterAdd] := one*)
        voters[voterAdd] := one;
        is_candidate1 = builtin eq candidate one; 
        match is_candidate1 with 
        | True => 
            vote1 <- candidate1;
            u_vote1 = builtin add vote1 one;
            candidate1 := u_vote1; 
            e = { _eventname : "Voting for candidate 1 success"; amount : _amount };
            event e
        | False => 
            is_candidate2 = builtin eq candidate two; 
            match is_candidate2 with 
            | True =>
                vote2 <- candidate2;
                u_vote2 = builtin add vote2 one; 
                candidate2 := u_vote2; 
                e = { _eventname : "Voting for candidate 2 success"; amount : _amount };
                event e
            | False => 
                e = { _exception : "Unknown candidate"; message : "There is no such candidate" };
                throw e
            end 
        end 
    end 
end
`

const init = [
    // this parameter is mandatory for all init arrays
    {
      vname: '_scilla_version',
      type: 'Uint32',
      value: '0',
    },
    {
      vname: 'owner',
      type: 'ByStr20',
      value: `${address}`,
    },
  ];

const contract = zilliqa.contracts.new(code, init);

async function deploy(contract){
    const [deployTx, hello] = await contract.deploy(
        {
          version: VERSION,
          gasPrice: myGasPrice,
          gasLimit: Long.fromNumber(10000),
        },
        33,
        1000,
        false,
      );
    
    // Introspect the state of the underlying transaction
    console.log(`Deployment Transaction ID: ${deployTx.id}`);
    console.log(`Deployment Transaction Receipt:`);
    console.log(deployTx.txParams.receipt);

    // Get the deployed contract address
    console.log('The contract address is:');
    console.log(hello.address);

}

deploy(contract);