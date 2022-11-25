const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const hash = keccak256(publicKey.slice(1, publicKey.length));

    const address = hash.slice(-20);

    return address;
}

module.exports = getAddress;
