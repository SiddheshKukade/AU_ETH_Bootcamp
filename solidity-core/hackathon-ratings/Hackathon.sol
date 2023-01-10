// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint256[] ratings;
    }

    Project[] projects;

    // Helper
    function getAverage(uint256[] memory _ratings)
        internal
        pure
        returns (uint256)
    {
        uint256 sum;
        for (uint256 i = 0; i < _ratings.length; i++) {
            sum += _ratings[i];
        }
        return sum / _ratings.length;
    }

    function findWinner() external view returns (Project memory) {
        Project memory winner;
        uint256 winnerAverage = 0;
        for (uint256 i = 0; i < projects.length; i++) {
            uint256 average = getAverage(projects[i].ratings);
            if (average > winnerAverage) {
                winnerAverage = average;
                winner = projects[i];
            }
        }
        return winner;
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint256[](0)));
    }

    function rate(uint256 _idx, uint256 _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
