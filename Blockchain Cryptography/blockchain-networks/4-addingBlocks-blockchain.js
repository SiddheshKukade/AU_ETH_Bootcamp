const Block = require("./Block");
const SHA256 = require("crypto-js/sha256");

class Blockchain {
    constructor() {
        const block = new Block("Zibberish");
        this.chain = [block]; // genisis block
    }
    addBlock(newBlock) {
        this.chain.push(newBlock);
    }
}
const blockchain = new Blockchain();
const block = new Block("Charlie sent Dave 2 BTC");

blockchain.addBlock(block);
module.exports = Blockchain;
