import { useState } from "react";
import server from "./server";
import { generateSignature } from "./helper";
function Transfer({ address, setBalance, privateKey }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    async function transfer(evt) {
        evt.preventDefault();
        const { signatureHex, recoveryBit } = await generateSignature(
            sendAmount,
            recipient,
            privateKey
        );
        // console.log("Signature = ", signatureHex);
        const {
            data: { balance, sender },
        } = await server.post(`send`, {
            signature: signatureHex,
            recoveryBit,
            amount: parseInt(sendAmount),
            recipient,
        });
        setBalance(balance);
        // console.log(sender);
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;
