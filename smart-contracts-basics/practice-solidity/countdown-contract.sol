// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint tickCount = 1;

    function tick() external {
        if (tickCount == 10) {
            selfdestruct(payable(msg.sender));
        } else {
            tickCount++;
        }
    }
}
