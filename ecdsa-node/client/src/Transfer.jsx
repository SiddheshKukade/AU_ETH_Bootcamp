import { useState } from "react";
import server from "./server";
import { generateSignature } from "./helper";
import { useEffect } from "react";
function Transfer({
    fromAddress,
    setBalance,
    privateKey,
    setPrivateKey,
    setAddress,
}) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [addressToNonce, setAddressToNonce] = useState({}); //address => nonce
    const [nextNonce, setNextNonce] = useState(1); //nonce is 0 so next nonce is 1

    async function transfer(evt) {
        try {
            evt.preventDefault();
            const { signatureHex, recoveryBit } = await generateSignature(
                sendAmount,
                recipient,
                privateKey
            );
            const doesAddressExists = !fromAddress in addressToNonce;
            if (!doesAddressExists) {
                setAddressToNonce({ ...addressToNonce, [fromAddress]: 0 });
            }
            const {
                data: { balance, sender, nonceFromServer },
            } = await server.post(`send`, {
                signature: signatureHex,
                recoveryBit,
                amount: parseInt(sendAmount),
                recipient,
                nextNonce: !doesAddressExists ? 1 : nextNonce,
            });
            setBalance(balance);
            setAddressToNonce({
                ...addressToNonce,
                [sender]: nonceFromServer,
            });
            setNextNonce(nonceFromServer + 1);
            setSendAmount("");
            setRecipient("");
            setPrivateKey("");
            setAddress("");
            setBalance(0);
            alert("Transfer successful");
            console.log(addressToNonce);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {}, [addressToNonce[fromAddress]]);

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
