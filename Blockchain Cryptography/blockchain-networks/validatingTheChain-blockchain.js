const Block = require("./Block");
const SHA256 = require("crypto-js/sha256");

class Blockchain {
    constructor() {
        const block = new Block("Zibberish");
        this.chain = [block]; // genisis block
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.chain[this.chain.length - 1].toHash();
        newBlock.data = "Some More Data";
        this.chain.push(newBlock);
    }
    isValid() {
        let isChainValid = true;
        const blockchain = this.chain;
        for (let i = 1; i < blockchain.length; i++) {
            const previousBlock = blockchain[i - 1];
            const currentBlock = blockchain[i];
            if (
                previousBlock.toHash().toString() !=
                currentBlock.previousHash.toString()
            ) {
                isChainValid = false;
            }
        }
        return isChainValid;
    }
}
const blockchain = new Blockchain();
const block = new Block();

blockchain.addBlock(block);
module.exports = Blockchain;
