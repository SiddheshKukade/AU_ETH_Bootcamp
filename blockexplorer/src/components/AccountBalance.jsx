import React, { useState } from "react";
import { useEffect } from "react";
import { formatEther } from "../helper";
import { getAccountBalance } from "../services";
import Search from "./Search";

const AccountBalance = () => {
    const [accountBalance, setAccountBalance] = useState(null);

    const handleSearch = async (inputValues) => {
        if (!inputValues) {
            alert("Please enter an address");
            return;
        }
        const balance = await getAccountBalance(inputValues);
        setAccountBalance(balance.toString());
        return () => {
            setAccountBalance(null);
        };
    };
    return (
        <div>
            <Search
                handleSearch={handleSearch}
                placeholder="Address"
                name="address"
            />
            {accountBalance === null ? (
                <div className="text-center text-4xl">
                    Please Search Balance for some Address{" "}
                </div>
            ) : (
                <div>
                    <div className="text-2xl text-center ">
                        Your Account Balance:{" "}
                        <span className="text-blue-600">
                            {formatEther(accountBalance)} ETH
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountBalance;
