// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    // Found some gotchas here have a look at it
    // https://discord.com/channels/1039895401832128532/1047627160812277761/1053513309820813342
    uint8 public a = 1;
    uint16 public b = 65533;
    uint256 public sum = a + b;
}
