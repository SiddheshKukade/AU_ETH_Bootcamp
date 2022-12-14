const provider = require("./provider");

async function getTotalBalance(addresses) {
    const queries = [];
    addresses.forEach((address, index) => {
        queries.push({
            jsonrpc: "2.0",
            id: index,
            method: "eth_getBalance",
            params: [address, "latest"],
        });
    });
    const responses = await provider.send(queries);

    let totalBalance = 0;
    for (let data of responses) {
        console.log(data);
        totalBalance += parseInt(data.result);
    }
    return totalBalance;

    // return the total balance of all the addresses
}

module.exports = getTotalBalance;
