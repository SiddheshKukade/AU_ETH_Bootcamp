import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatAddress, formatEther, joinClasses } from "../helper";
import { getLastTenTxs } from "../services";
const TransactionMinimal = ({ from, to, txhash, amount }) => {
    const navigate = useNavigate();
    const handleTransactionDetails = async (txHash) => {
        navigate(`/transaction/${txHash}`);
    };
    return (
        <div
            className={joinClasses(
                "bg-gray-200",
                "flex",
                "gap-8",
                "mt-2",
                "p-4",

                "rounded"
            )}
        >
            <div>
                Tx Hash:{" "}
                <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleTransactionDetails(txhash)}
                >
                    {formatAddress(txhash)}
                </span>
            </div>{" "}
            <div onClick={() => navigate(`/transactions/${from}`)}>
                From:{" "}
                <span className="text-blue-600 cursor-pointer">
                    {formatAddress(from)}
                </span>
            </div>
            <div onClick={() => navigate(`/transations/${to}`)}>
                To:{" "}
                <span className="text-blue-600 cursor-pointer">
                    {formatAddress(to)}
                </span>
            </div>
            <div>
                Amount:{" "}
                <span className="text-blue-600">{formatEther(amount)} ETH</span>
            </div>
        </div>
    );
};
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    (async () => {
        const txs = await getLastTenTxs();
        setTransactions(txs);
    })();
    return (
        <div>
            <h1 className="text-2xl text-center mb-5">Latest Transactions</h1>
            {transactions.length ? (
                transactions.map(({ hash, to, from, value }) => (
                    <TransactionMinimal
                        key={hash}
                        from={from}
                        to={to}
                        txhash={hash}
                        amount={value.toString()}
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Transactions;
