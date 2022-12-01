const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");
let addressToNonceServer = {};
app.use(cors());
app.use(express.json());

const balances = {
    //  Private Key 98d3f3014d9fb99a4e9a6ec97072e0fa211a875703ccdf17f886d5e8a07a4147
    "0x7c726484d25ed94c388a": 100,
    // Private Key a3b6421c70f73fa5487af7c72f9cdb44c9e6873f6d2dc90936a509b8c2850aaa
    "0xaaa8fb541540f7d954ec": 50,
    // Private Key 37ebdf26165f916f3916e59290b38565cb91aebda633476891944a8673a1aa0f
    "0x187de361f645dfa21739": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.get("/accounts", (req, res) => {
    const accounts = [
        {
            privateKey:
                "98d3f3014d9fb99a4e9a6ec97072e0fa211a875703ccdf17f886d5e8a07a4147",
        },
        {
            privateKey:
                " a3b6421c70f73fa5487af7c72f9cdb44c9e6873f6d2dc90936a509b8c2850aaa",
        },
        {
            privateKey:
                " 37ebdf26165f916f3916e59290b38565cb91aebda633476891944a8673a1aa0f",
        },
    ];
    Object.entries(balances).forEach(([address, balance], index) => {
        accounts[index] = {
            ...accounts[index],
            address: address,
            balance: balance,
        };
    });
    res.json(accounts);
});

app.post("/send", (req, res) => {
    const { signature, recoveryBit, amount, recipient, nextNonce } = req.body;
    const uint8ArrayMsg = Uint8Array.from([amount, recipient]);
    const messageHash = toHex(uint8ArrayMsg);

    // recover public key from signature

    const publicKey = secp.recoverPublicKey(
        messageHash,
        signature,
        recoveryBit
    );

    // hash public key to get address
    const publicKeyHash = toHex(keccak256(publicKey));
    // console.log("Public key", publicKeyHash);
    const sender = `0x${publicKeyHash.slice(-20)}`; // 20 bytes address
    // console.log("Sender = ", sender);
    //Verification
    const isValidSign = secp.verify(signature, messageHash, toHex(publicKey));
    const doesAddressExists = !sender in addressToNonceServer;
    if (!doesAddressExists) {
        addressToNonceServer = { ...addressToNonceServer, [sender]: 0 };
    }
    let isNonceValid = nextNonce === addressToNonceServer[sender] + 1;
    setInitialBalance(sender);
    setInitialBalance(recipient);
    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else if (!isValidSign) {
        res.status(400).send({ message: "Invalid Signature" });
    } else if (!isNonceValid) {
        res.status(400).send({ message: "Invalid Nonce" });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        addressToNonceServer = {
            ...addressToNonceServer,
            [sender]: addressToNonceServer[sender] + 1,
        };
        res.send({
            balance: balances[sender],
            sender: sender,
            nonceFromServer: addressToNonceServer[sender],
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
