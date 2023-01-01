pragma solidity ^0.8.4;

contract Contract {
    function sumAndAverage(
        uint a,
        uint b,
        uint c,
        uint d
    ) external pure returns (uint, uint) {
        uint sum = a + b + c + d;
        uint average = sum / 4;
        return (sum, average);
    }
}
