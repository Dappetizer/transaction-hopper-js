module.exports = class ActionHopper {

  constructor(account, api, esr) {
    this.hopper = []; //action hopper
    this.account = account; //signing account
    this.permission = 'active';
    this.api = api; //api object from eosjs
    // this.esr = esr; //esr object from eosio-signing-request
  }

  //return contents of hopper
  getHopper() {
    return this.hopper;
  }

  //return signing account
  getSigner() {
    return this.signer;
  }

  //return signing permission
  getPermission() {
    return this.permission;
  }

  //load an action into the hopper
  load(action) {
    this.hopper.push(action);
  }

  //frontload an action into the hopper
  frontload(action) {
    this.hopper.unshift(action);
  }

  //view the actions loaded in hopper
  view() {
    console.log(this.hopper);
  }

  //clear the hopper
  clear() {
    this.hopper = [];
  }

  //sign and broadcast contents of hopper
  async fire() {

    //TODO: put in try/catch
    const res = await this.api.transact({
      actions: this.getHopper()
    }, {
      broadcast: true,
      sign: true,
      blocksBehind: 3,
      expireSeconds: 30,
    });

    console.dir(res);
    // console.log('Transaction Executed:', res.transaction_id);

    this.clear();
  }

  //cosign transaction with CosignAuthorityProvider
  async cosign() {

    //TODO

  }

  //handoff transaction to energy provider for cosigning
  async handoff() {

    //send esr request to energy provider

    //await response?

  }

  //encode a tansaction with esr
  encode() {

    //TODO

  }

  decode() {

    //TODO

  }

};