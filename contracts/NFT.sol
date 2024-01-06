// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; //Solidity version

//Import openzeppelin contracts
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;
    uint256 public cost;

    constructor( // called once when the contract is created
        string memory _name, //memory: the variable will be holded only during a contract.
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) { // constructor is internal(ERC 721)
        owner = msg.sender;
        cost = _cost;
    }

    function mint(string memory tokenURI) public payable { // "payable" access modifier enables the function to receive & send ether.
        // We can get the value of ether received with "msg.value" 
        require(msg.value >= cost);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public {
        require(msg.sender == owner);
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
