import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Accounts from "./Accounts";

function App() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    return (
        <div className="app">
            <Wallet
                balance={balance}
                setBalance={setBalance}
                address={address}
                setAddress={setAddress}
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
            />
            <Transfer
                fromAddress={address}
                setBalance={setBalance}
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
                setAddress={setAddress}
            />
            <Accounts />
        </div>
    );
}

export default App;
