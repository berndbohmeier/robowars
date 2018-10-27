pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract Robots is ERC721 {

    uint constant numberInitialRobots = 10;

    constructor(address user) ERC721() public {
        _mintInitialRobots(user);
    }

    function fight(uint robot1, uint robot2) public {
        uint newRobotId = _genRobotId(robot1, robot2);
        uint winner = _winner(robot1, robot2);
        _mint(ownerOf(winner), newRobotId);
    }

    function _winner(uint robot1, uint robot2) internal returns (uint) {
        uint value = _randomValue(0, 2);
        if (value == 0) {
            return robot1;
        } else {
            return robot2;
        }
    }

    function _mintInitialRobots(address receiver) internal {
        for (uint i = 1; i <= numberInitialRobots; i++) {
            _mint(receiver, i);
        }
    }

    // Of course not really safe but hopefully good enough for this game
    function _randomValue(uint min, uint max) returns (uint) {
        return uint(keccak256(block.timestamp)) % (max - min) + min;
    }

    function _genRobotId(uint robot1, uint robot2) internal returns (uint) {
        return uint(keccak256(keccak256(robot1), keccak256(robot2)));
    }

}
