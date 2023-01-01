const Block = require("./Block");
const SHA256 = require("crypto-js/sha256");

class Blockchain {
    constructor() {
        const block = new Block("Zibberish");
        this.chain = [block]; // genisis block
    }
}
const blockchain = new Blockchain();

module.exports = Blockchain;
