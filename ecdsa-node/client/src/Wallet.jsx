import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    privateKey,
    setPrivateKey,
}) {
    async function onChange(evt) {
        // generate public key and address from private key
        const _privateKey = evt.target.value;
        setPrivateKey(_privateKey);

        const publicKey = secp.getPublicKey(_privateKey);
        const publicKeyHash = toHex(keccak256(publicKey));
        // console.log("Public key Hash wallet", publicKeyHash);
        const address = `0x${publicKeyHash.slice(-20)}`; // 20 bytes address
        setAddress(address);
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>
            <p className="note-body">
                <span className="note-title">NOTE: </span> You will never ever
                will input your Private like this.
                <br />
                But for the purpose of understanding how public key cryptography
                works we are doing it here,
                <br />
                Generally your wallet will store your private key and sign
                message when needed.
            </p>
            <label>
                Private Key
                <input
                    placeholder="Type in a Private Key"
                    value={privateKey}
                    onChange={onChange}
                ></input>
            </label>
            <div>Address: {address}</div>{" "}
            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
