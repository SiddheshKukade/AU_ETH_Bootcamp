const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(data) {
        this.data = data;
    }
    toHash() {
        return SHA256(this.data); // a hash!
    }
}
const block = new Block("Alice sent Bob 1 BTC");
module.exports = Block;
