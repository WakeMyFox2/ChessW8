// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTWeapon.sol";

contract ChessGame {
    struct Player {
        address playerAddress;
        uint[] weapons;
    }

    Player[2] public players;

    constructor(address _player1, address _player2) {
        players[0] = Player(_player1, new uint[](0));
        players[1] = Player(_player2, new uint[](0));
    }

    function addWeapon(uint playerIndex, uint weaponId) external {
        require(playerIndex < 2, "Invalid player index");
        players[playerIndex].weapons.push(weaponId);
    }
}
