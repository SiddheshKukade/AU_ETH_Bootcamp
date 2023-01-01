const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
    BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempoo  l
    mempool.push(transaction);
}

function mine() {
    // TODO: mine a block
    let blockHeight = blocks.length;
    const transactions = mempool.splice(0, MAX_TRANSACTIONS); //this modifies original array i.e mempool
    let nonce = 0;
    while (true) {
        let blockHash = SHA256(
            JSON.stringify({ nonce: nonce, id: blockHeight })
        );
        const int = BigInt(`0x${blockHash}`);
        if (int <= TARGET_DIFFICULTY) {
            const block = { transactions, hash: blockHash, nonce: nonce };
            blocks.push(block);
            break;
        }
        nonce++;
    }
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};
