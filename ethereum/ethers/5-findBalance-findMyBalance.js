const { Wallet, providers } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);
function findMyBalance(privateKey) {
    const wallet = new Wallet(privateKey, provider);
    const txRes = wallet.getBalance();
    return txRes;
    // retrieve the balance, given a private key
}

module.exports = findMyBalance;
