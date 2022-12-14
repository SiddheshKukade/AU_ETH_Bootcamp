import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatAddress, formatEther, joinClasses } from "../helper";
import { getIndividualBlock } from "../services";
const Block = () => {
    const navigate = useNavigate();
    const { blockNumber } = useParams();
    const [blockData, setBlockData] = useState();
    (async () => {
        const data = await getIndividualBlock(blockNumber);
        setBlockData(data);
    })();

    //     console.log(formatEther(baseFeePerGas.toString()));
    return (
        <div>
            <h1 className="text-center text-3xl my-5">Block Details</h1>
            <div
                className={joinClasses(
                    "bg-gray-100",
                    "p-10",
                    "mx-auto",
                    "w-1/2",
                    "flex",
                    "flex-col",
                    "gap-8",
                    "rounded"
                )}
            >
                {!blockData ? (
                    "Loading..."
                ) : (
                    <>
                        <div className="block-data">
                            Base Fee :{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(
                                    blockData.baseFeePerGas.toString() || ""
                                )}{" "}
                                ETH
                            </span>
                        </div>
                        <div className="block-data">
                            Gas Limit:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(
                                    blockData.gasLimit.toString() || ""
                                )}{" "}
                                ETH
                            </span>
                        </div>
                        <div className="block-data">
                            Gas Used:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatEther(
                                    blockData.gasUsed.toString() || ""
                                )}{" "}
                                ETH
                            </span>
                        </div>
                        <div className="block-data">
                            Block Hash:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatAddress(blockData.hash || "")}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Validator:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatAddress(blockData.miner || "")}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Parent Hash:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {formatAddress(blockData.parentHash || "")}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            {/* TODO: Install dayjs and format time */}
                            Timestamp:{" "}
                            <span className="text-blue-600">
                                {" "}
                                {blockData.timestamp || ""}{" "}
                            </span>
                        </div>
                        <div className="block-data">
                            Transactions Count:{" "}
                            <span className="text-blue-600">
                                {blockData.transactions.length}{" "}
                            </span>
                        </div>
                        <div className="w-full space-y-3  h-32 overflow-scroll flex flex-col">
                            <span className="mb-5">Transactions</span>
                            {blockData.transactions.map((tx) => (
                                <ul className="">
                                    <li
                                        className="cursor-pointer text-blue-600"
                                        onClick={() =>
                                            navigate(`/transaction/${tx}`)
                                        }
                                    >
                                        {tx}
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Block;
