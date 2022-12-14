const { Wallet, utils, providers } = require("ethers");
const { ganacheProvider, PRIVATE_KEY } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    const txRes = await wallet.sendTransaction({
        value,
        to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00,
    });

    return txRes;
}

module.exports = sendEther;
