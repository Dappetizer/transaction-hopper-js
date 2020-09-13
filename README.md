# eosio-action-hopper
A JavaScript based Action Hopper for EOSIO software

## Usage

### Setup

    const actionHopper = require('eosio-action-hopper');
    const hopper = ActionHopper(signer, api);

### Load Action

    //define new action
    let newAction = {
        account: 'exampleacct',
        name: 'actionname',
        authorization: [
            {
                actor: 'testaccount1',
                permission: 'active',
            }
        ],
        data: {
            name_param: 'testaccount1'
            int_param: 5
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
