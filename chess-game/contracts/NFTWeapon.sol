// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTWeapon is ERC721 {
    uint public nextTokenId;

    constructor() ERC721("NFTWeapon", "NFTW") {}

    function mint(address to) external {
        _mint(to, nextTokenId);
        nextTokenId++;
    }
}
