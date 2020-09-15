# eosio-action-hopper
A JavaScript based Transaction Hopper for EOSIO software

## Usage

### Setup

    //eosjs
    const { Api, JsonRpc, RpcError } = require('eosjs');
    const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); //development only
    const fetch = require('node-fetch'); //node only; not needed in browsers
    const { TextEncoder, TextDecoder } = require('util'); //node only; native TextEncoder/Decoder
    const defaultPrivateKey = process.env.PRIV_KEY;
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpc = new JsonRpc(process.env.RPC_ENDPOINT, { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    //require module
    const transactionHopper = require('transaction-hopper-js');

    //set signer
    const signer = 'testaccounta';

    //initialize hopper
    const hopper = TransactionHopper(signer, api);

### Load Action

    //define action
    let newAction = {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [
            {
                actor: 'testaccount1',
                permission: 'active',
            }
        ],
        data: {
            from: 'testaccount1'
            to: 5
            quantity: '1.0000 TLOS'
            memo: ''
        }
    };

    //load action into hopper (loads into back of queue)
    hopper.load(newAction);

### Frontload Action

    //load action into front of hopper
    hopper.frontload(newAction);

### Fire Transaction

    //fire contents of hopper as single transaction, clears hopper
    hopper.fire();

### View Hopper

    //view contents of hopper
    hopper.view();
