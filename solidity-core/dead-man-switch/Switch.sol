// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address public owner;
    address public recipient;
    uint256 totalBal;
    uint256 lastTimestamp;

    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        totalBal = msg.value;
        lastTimestamp = block.timestamp + 52 weeks;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    modifier timeNotPassed() {
        require(lastTimestamp > block.timestamp, "Sorry! Time has passed");
        _;
    }
    modifier timePassed() {
        require(lastTimestamp < block.timestamp, "Sorry! Time has not passed");
        _;
    }

    function withdraw() external timePassed {
        (bool success, ) = recipient.call{value: totalBal}("");
        require(success);
    }

    function ping() external onlyOwner timeNotPassed {
        lastTimestamp = block.timestamp + 52 weeks;
    }
}
