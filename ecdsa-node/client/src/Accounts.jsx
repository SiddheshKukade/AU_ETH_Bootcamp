import React from "react";
import { useEffect, useState } from "react";
import server from "./server";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        (async () => {
            const { data: _accounts } = await server.get("accounts");
            setAccounts(_accounts);
        })();
    }, []);

    return (
        <div className="container ">
            <h1>Try Playing Around With These Accounts</h1>
            {accounts.map((account, index) => (
                <div key={index}>
                    <div>Private Key : {account.privateKey}</div>
                    <div>Address : {account.address}</div>
                    <div>Balance : {account.balance}</div>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Accounts;
