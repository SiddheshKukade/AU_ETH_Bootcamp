// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
error NotOwner();

contract Contract {
    address public owner;

    constructor() payable {
        require(msg.value >= 1 ether, "Want More Ether!");
        owner = msg.sender;
    }

    function withdraw() public {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }
}
