module.exports = class TransactionHopper {

    constructor(signer, api) {
        this.hopper = [];
        this.signer = signer;
        this.permission = 'active';
        this.api = api;
        //TODO: this.cosign = false; //esr mode
        //TODO: this.cosigner = 'energytester'; //cosigning account
        //TODO: this.cosignProvider = '';
    }

    //return hopper
    getHopper() {
        return this.hopper;
    }

    //set actions in hopper
    setHopper(actions) {
        this.hopper = actions;
    }

    //return signing account
    getSigner() {
        return this.signer;
    }

    //set a new signer account
    setSigner(account) {
        this.signer = account;
    }

    //return signing permission
    getPermission() {
        return this.permission;
    }

    //set signing permission
    setPermission(permission) {
        this.permission = permission;
    }

    //load an action into the hopper
    load(action) {
        this.hopper.push(action);
    }

    //load an action into the front of the hopper
    frontload(action) {
        this.hopper.unshift(action);
    }

    //TODO: filter hopper for cosign auth
    // filter() {
    //     let temp_hopper = this.hopper;
    //     temp_hopper.forEach(element => {
    //     });
    // }

    //print the actions loaded in hopper
    view() {
        console.log(this.hopper);
    }

    //clear the hopper
    clear() {
        this.hopper = [];
    }

    //TODO: push cosigned trx to cosigner
    // transport(cosignProvider) {
    //     //TODO: push esr transaction to cosigner
    // }

    //cosign a transaction
    // async cosign() {

    //     const res = await this.api.transact({
    //         actions: this.getHopper()
    //     }, {
    //         broadcast: false,
    //         sign: true,
    //         blocksBehind: 3,
    //         expireSeconds: 30,
    //     });

    //     console.log(res);

    // }

    //sign and broadcast contents of hopper
    async fire() {

        //push transaction
        const res = await this.api.transact({
            actions: this.getHopper()
        }, {
            broadcast: true,
            sign: true,
            blocksBehind: 3,
            expireSeconds: 30,
        });

        //if trx executed
        // if (res.processed.receipt.status == 'executed') {
        //     console.log('Transaction Executed:', res.transaction_id);
        // } else {
        //     //TODO: report error
        //     console.log('Transaction Error');
        // }

        //clear hopper
        this.clear();

        return res;
    }

};