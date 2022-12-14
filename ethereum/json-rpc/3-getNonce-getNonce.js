const provider = require("./provider");

async function getNonce(address) {
    const response = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount", //Note: nonce means transaction count
        params: [address, "latest"],
    });

    return response.result;
}

module.exports = getNonce;
