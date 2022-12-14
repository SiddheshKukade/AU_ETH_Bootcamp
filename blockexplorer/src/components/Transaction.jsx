import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatEther, joinClasses } from "../helper";
import { getIndividualTransaction } from "../services";

const Transaction = () => {
    const { txHash } = useParams();
    const [txData, setTxData] = useState();
    const navigate = useNavigate();
    (async () => {
        const data = await getIndividualTransaction(txHash);
        setTxData(data);
    })();
    return (
        <div>
            <h1 className="text-center text-3xl my-5">Transaction Details</h1>
            <div
                className={joinClasses(
                    "bg-gray-100",
                    "p-10",
                    "mx-auto",
                    "w-3/4",
                    "flex",
                    "flex-col",
                    "gap-8",
                    "rounded",
                    "my-10"
                )}
            >
                {!txData ? (
                    "Loading..."
                ) : (
                    <>
                        <div className="block-data">
                            Block Hash:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {txData.blockHash}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Block Number:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {txData.blockNumber}
                            </span>
                        </div>
                        <div className="block-data">
                            Nonce:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {txData.nonce}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Transaction Hash:{" "}
                            <span className="text-blue-600 ">
                                {" "}
                                {txData.hash}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            From:{" "}
                            <span
                                onClick={() =>
                                    navigate(`/transactions/${txData.from}`)
                                }
                                className="text-blue-600 cursor-pointer"
                            >
                                {" "}
                                {txData.from}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            To:{" "}
                            <span
                                onClick={() =>
                                    navigate(`/transactions/${txData.to}`)
                                }
                                className="text-blue-600 cursor-pointer"
                            >
                                {" "}
                                {txData.to}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Value:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(txData.value.toString())} ETH
                            </span>
                        </div>
                        <div className="block-data">
                            Gas Limit :{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(txData.gasLimit.toString())} ETH
                            </span>
                        </div>
                        <div className="block-data">
                            {/* TODO: Install dayjs and format time */}
                            Gas Price:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(txData.gasPrice.toString())} ETH
                            </span>
                        </div>

                        <div className="block-data">
                            v:{" "}
                            <span className="text-blue-600">{txData.v} </span>
                        </div>
                        <div className="block-data">
                            r:{" "}
                            <span className="text-blue-600">{txData.r} </span>
                        </div>
                        <div className="block-data">
                            s:{" "}
                            <span className="text-blue-600">
                                {txData.s}
                                {""}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Transaction;
