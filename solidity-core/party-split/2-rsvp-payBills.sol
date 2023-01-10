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
        address[] memory _participants = participants;
        for (uint256 i = 0; i < _participants.length; i++) {
            if (_participants[i] == msg.sender) {
                revert("Already joined");
            }
        }
        participants.push(msg.sender);
    }

    function payBill(address venue, uint256 amount) external {
        (bool success, ) = payable(venue).call{value: amount}("");
        require(success, "Transfer to organiser Failed");
        uint256 remainingBalance = address(this).balance;
        if (remainingBalance != 0) {
            uint256 sharePerPerson = remainingBalance / participants.length;
            address[] memory _participants = participants;
            for (uint256 i = 0; i < _participants.length; i++) {
                (bool _success, ) = payable(_participants[i]).call{
                    value: sharePerPerson
                }("");
                require(_success, "Transfer to participant Failed");
            }
        }
    }
}
