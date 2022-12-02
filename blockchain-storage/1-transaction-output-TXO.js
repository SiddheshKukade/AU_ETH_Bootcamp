class TXO {
    constructor(owner, amount) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false;
    }
    spend() {
        this.spent = true;
    }
}
const txo = new TXO("1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM", 10);
console.log("Owner address: ", txo.owner); //should be 1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM
console.log("Amount: ", txo.amount); //should be 10
console.log("IsSpent", txo.spent); //should be false
txo.spend(); // this will spend the amount
console.log("IsSpent", txo.spent); //should be true
module.exports = TXO;
