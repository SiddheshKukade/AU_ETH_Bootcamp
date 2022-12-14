import { Alchemy, Network } from "alchemy-sdk";
import { formatEther } from "./helper";
const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

/*******************************************************************
 * MAKE ALL API CALL HERE AND CALL THESE FUNCTIONS ON FIRST RENDER *
 *******************************************************************/
export const getLastTenBlocks = async () => {
    const lastTenBlocks = [];
    const latestBlock = await alchemy.core.getBlockNumber();
    let block = latestBlock;
    while (block > latestBlock - 10) {
        const _block = await alchemy.core.getBlock(block);
        lastTenBlocks.push(_block);
        block--;
    }
    return lastTenBlocks;
};

export const getLastTenTxs = async () => {
    const _transactions = [];
    const latestBlockNumber = await alchemy.core.getBlockNumber();
    const latestBlock = await alchemy.core.getBlock(latestBlockNumber);

    for (let txHash of latestBlock.transactions.slice(0, 10)) {
        const tx = await alchemy.transact.getTransaction(txHash);
        _transactions.push(tx);
    }
    return _transactions;
};
export const getIndividualBlock = async (blockNumber) => {
    const block = await alchemy.core.getBlock(parseInt(blockNumber));
    // console.log(formatEther(block.baseFeePerGas.toString()));
    return block;
};
export const getIndividualTransaction = async (txhash) => {
    const tx = await alchemy.transact.getTransaction(txhash);
    return tx;
};
export const getAccountBalance = async (address) => {
    const balance = await alchemy.core.getBalance(address, "latest");
    return balance;
};
/***********************
 * ETHERSCAN API CALLS *
 ***********************/
export const getAccountTxs = async (address) => {
    const API_ENDPOINT = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data.result;
};

/***********
 * NFT API *
 ***********/

export const getNftMetadata = async (nftAddress, tokenId) => {
    const metadata = await alchemy.nft.getContractMetadata(nftAddress, tokenId);
    return metadata;
};
