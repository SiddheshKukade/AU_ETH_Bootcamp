// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint256 amountToSend;
    address[] participants;

    constructor(uint256 amount) {
        amountToSend = amount;
    }

    function rsvp() external payable {
        require(msg.value == amountToSend, "amount is not correct");
        //   reading from storage is expensive, so we create a memory variable to copy the array
        address[] memory _participants = participants;
        for (uint256 i = 0; i < _participants.length; i++) {
            if (_participants[i] == msg.sender) {
                revert("Already joined");
            }
        }
        participants.push(msg.sender);
    }
}
