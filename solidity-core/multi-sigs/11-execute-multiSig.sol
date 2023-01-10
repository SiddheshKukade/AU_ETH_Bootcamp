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

    modifier onlyOwners() {
        bool isOwner;
        for (uint256 i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) {
                isOwner = true;
            }
        }
        require(isOwner, "Not an owner");
        _;
    }

    function addTransaction(address to, uint256 value)
        internal
        returns (uint256)
    {
        require(to != address(0), "invalid recipient");
        require(value > 0, "value is 0");
        uint256 txCount = transactions.length;
        transactions.push(Transaction(to, value, false));

        return txCount;
    }

    function confirmTransaction(uint256 txId) public onlyOwners {
        confirmations[txId][msg.sender] = true;
    }

    function submitTransaction(address to, uint256 value) external {
        uint256 txId = transactions.length; // No of tx as txId, this is zero-based so we are doing it before push
        addTransaction(to, value);
        confirmTransaction(txId);
    }

    function isConfirmed(uint256 txId) public view returns (bool) {
        uint256 confirmedTxs = getConfirmationsCount(txId);
        if (confirmedTxs == required) {
            return true;
        } else {
            return false;
        }
    }

    function executeTransaction(uint256 txId) public {
        bool _isConfirmed = isConfirmed(txId);
        require(_isConfirmed, "Sorry! Tx not confirmed");
        Transaction memory _tx = transactions[txId]; // txId == index of transaction in transactions array
        transactions[txId].executed = true; // updating state before transfer to prevent possible re-entrency. refer https://www.youtube.com/watch?v=pYKI4ad3eV0&t=1018s
        (bool success, ) = _tx.to.call{value: _tx.value}("");
        require(success, "Transfer failed in execute");
    }

    //    view/pure function
    function transactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getConfirmationsCount(uint256 transactionId)
        public
        view
        returns (uint256)
    {
        uint256 count;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                count++;
            }
        }
        return count;
    }

    receive() external payable {}
}
