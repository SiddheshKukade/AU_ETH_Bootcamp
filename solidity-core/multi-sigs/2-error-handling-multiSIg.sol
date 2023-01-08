// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;

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
}
