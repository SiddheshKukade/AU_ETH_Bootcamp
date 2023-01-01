import { useEffect, useState } from "react";
import Blocks from "./components/Blocks";
import Header from "./components/Header";
import Search from "./components/Search";
import Transactions from "./components/Transactions";
import { Route, Routes } from "react-router-dom";
import { getLastTenBlocks } from "./services";
import Block from "./components/Block";
import Transaction from "./components/Transaction";
import AccountInfo from "./components/AccountTxs";
import AccountTxs from "./components/AccountTxs";
import AccountBalance from "./components/AccountBalance";
import Nft from "./components/Nft";

function App() {
    return (
        <div className="">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <div className="flex justify-evenly my-10">
                                <Blocks />
                                <Transactions />
                            </div>
                        </div>
                    }
                />
                <Route path="/account-balance" element={<AccountBalance />} />
                <Route path="/block/:blockNumber" element={<Block />} />
                <Route path="/transaction/:txHash" element={<Transaction />} />
                <Route path="/transactions/:address" element={<AccountTxs />} />
                <Route path="/nft" element={<Nft />} />
            </Routes>
        </div>
    );
}

export default App;
