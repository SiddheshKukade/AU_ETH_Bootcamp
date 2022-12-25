# Emit Winner Event

External Contract

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
```

deployed to = "https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"

Project setup:

```shell
npm i -D hardhat
npm i dotenv
npx hardhat init
```

Deploy contract

'hh' is equivalent to npx hardhat to use hh, install

```shell
    npm install --global hardhat-shorthand
```

```shell
   hh run scripts/deploy --network goerli
```

after deployement copy the deployed address and go to open scripts/emitWinnerEvent.js
paste that address in `getContractAt(YOUR_DEPLOYED_ADDRESS)`

then copy paste this address "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502" into
contract.deploy() like this `contract.deploy("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502")`
Last step!

run

```shell
hh run scripts/emitWinnerEvent --network goerli
```

Woooohooo! You just emit event in the external contract

see how this executed

-   Your EOA account(wallet) initialize the transaction
-   You call emitWinnerEvent on EmitWinnerEvent contract that you created
-   Till here msg.sender is EOA and also tx.origin is EOA i.e You
-   Now here is gotcha. EmitWinnerEvent calls attempt() in external contract
-   Now msg.sender is EmitWinnerEvent contract address and tx.orgin is still EOA i.e You
-   So it passes the require condition of the external contract and event is emmited
