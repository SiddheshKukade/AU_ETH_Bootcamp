const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log("Private Key", toHex(privateKey));
const publicKey = secp.getPublicKey(privateKey);
console.log("Public Key Raw", toHex(publicKey));
const publicKeyHash = toHex(keccak256(publicKey));
console.log("Hashed Public key", publicKeyHash);
console.log("Address", publicKeyHash.slice(-20));

// Signing
const uint8Array = Uint8Array.from([
    "25",
    "54f6993a7f362ad2145698f08bb8db46785fe69a",
]);
const signature = secp.signSync(
    keccak256(uint8Array),
    toHex(keccak256(privateKey))
);
console.log("Signature using uint8Array", toHex(signature));

// Signing using bytes
const hashMsg = toHex(keccak256(uint8Array));
console.log("Hashed Message", hashMsg);
const signature1 = secp.signSync(hashMsg, privateKey);
console.log("Signature using hex", toHex(signature1));
// conclusion = No matter what you use uint8Array or hex signature is gonna be a same
