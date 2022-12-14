import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatAddress, formatEther, joinClasses } from "../helper";
import { getAccountTxs } from "../services";

const Transaction = ({
    blockNumber,
    from,
    to,
    amount,
    txHash,
    timeStamp,
    nonce,
}) => {
    const navigate = useNavigate();
    return (
        <div
            className={joinClasses(
                "bg-gray-200",
                "w-4/5",
                "mx-auto",
                "flex",
                "justify-center",
                "gap-8",
                "p-4",
                "mb-3",
                "border-b",
                "rounded"
            )}
        >
            <div className="">
                Block Number:{" "}
                <span className="text-blue-600"> {blockNumber}</span>
            </div>
            <div className=".">
                From:{" "}
                <span
                    onClick={() => navigate(`/transactions/${from}`)}
                    className="text-blue-600 cursor-pointer"
                >
                    {" "}
                    {formatAddress(from)}
                </span>
            </div>
            <div className=".">
                To:{" "}
                <span
                    onClick={() => navigate(`/transactions/${to}`)}
                    className="text-blue-600 cursor-pointer"
                >
                    {" "}
                    {formatAddress(to)}
                </span>
            </div>
            <div className=".">
                Amount:{" "}
                <span className="text-blue-600">
                    {" "}
                    {formatEther(amount.toString())}
                    ETH
                </span>
            </div>
            <div className=".">
                Transaction Hash:{" "}
                <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/transaction/${txHash}`)}
                >
                    {formatAddress(txHash)}
                </span>
            </div>
            <div className=".">
                TimeStamp: <span className="text-blue-600"> {timeStamp}</span>
            </div>
            <div className=".">
                Nonce: <span className="text-blue-600"> {nonce}</span>
            </div>
        </div>
    );
};
const AccountTxs = () => {
    const { address } = useParams();
    const [accountTxs, setAccountTxs] = useState();
    (async () => {
        const data = await getAccountTxs(address);
        setAccountTxs(data);
    })();

    return (
        <div>
            <h1 className="text-3xl text-center my-10">
                {" "}
                Account Transaction Details
            </h1>
            <div className="">
                {!accountTxs
                    ? "Loading..."
                    : accountTxs.map((tx) => {
                          return (
                              <Transaction
                                  blockNumber={tx.blockNumber}
                                  from={tx.from}
                                  to={tx.to}
                                  amount={tx.value}
                                  txHash={tx.hash}
                                  timeStamp={tx.timeStamp}
                                  nonce={tx.nonce}
                              />
                          );
                      })}
            </div>
        </div>
    );
};

export default AccountTxs;
