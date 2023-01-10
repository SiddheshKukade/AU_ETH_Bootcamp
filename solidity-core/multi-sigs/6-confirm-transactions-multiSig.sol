// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    Transaction[] public transactions;

    mapping(uint256 => mapping(address => bool)) public confirmations;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length >= 1, "No owners set");
        require(_required >= 1, "Zero required confirmation set");
        require(
            _required <= _owners.length,
            "cannot set confirmation more the owners"
        );
        owners = _owners;
        required = _required;
    }

    function addTransaction(address to, uint256 value)
        public
        returns (uint256)
    {
        require(to != address(0), "invaltxId recipient");
        require(value > 0, "value is 0");
        uint256 txCount = transactions.length;
        transactions.push(Transaction(to, value, false));

        return txCount;
    }

    function confirmTransaction(uint256 txId) public {
        confirmations[txId][msg.sender] = true;
    }

    //    view/pure function
    function transactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getConfirmationsCount(uint256 transactiontxId)
        public
        view
        returns (uint256)
    {
        uint256 count;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactiontxId][owners[i]]) {
                count++;
            }
        }
        return count;
    }
}
