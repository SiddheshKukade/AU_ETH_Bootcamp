// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
interface ContractToCall{
function attempt() external;
}
contract EmitWinnerEvent{
    // address constant CONTRACT_ADDRESS = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;
    function emitWinnerEvent(address contractAddress) public {
       ContractToCall(contractAddress).attempt(); 
    }
}
