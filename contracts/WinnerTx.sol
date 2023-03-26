// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract WinnerTx {
    address public contractInstance;

    constructor(address _contract) {
        contractInstance = _contract;
    }

    function callAttempt() external {
        // we want to call the contract using the abi.encodeWithSignature(signatureString, arg);
        (bool success, ) = contractInstance.call(abi.encodeWithSignature("attempt()"));
        require(success);
    }
}
