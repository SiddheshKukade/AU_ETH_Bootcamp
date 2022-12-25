const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
let id =0;
let mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let blockHeight = blocks.length;
    let transactions = mempool.splice(0,MAX_TRANSACTIONS)
    let nonceNo = 0;
    let obj = { id: blockHeight, transactions,nonce: nonceNo} 
    let hash = SHA256(JSON.stringify(obj))
    let int = BigInt(`0x${hash}`);
    while(int  >TARGET_DIFFICULTY){
       nonceNo++; 
            obj = { id: blockHeight, transactions, nonce: nonceNo} 
     hash = SHA256(JSON.stringify(obj))
     int = BigInt(`0x${hash}`);
    }
    blocks.push({...obj, hash})
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};
