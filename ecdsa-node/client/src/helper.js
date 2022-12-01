import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";

export const generateSignature = async (amount, recipient, privateKey) => {
    const uint8Array = Uint8Array.from([amount, recipient]);
    const messageHash = toHex(uint8Array);
    // console.log("Message Hash = ", messageHash);
    const [signature, recovery] = await secp.sign(messageHash, privateKey, {
        recovered: true,
    });

    const signatureHex = toHex(signature);

    const recoveryBit = recovery;

    return { signatureHex, recoveryBit };
};
