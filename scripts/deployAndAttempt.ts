import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
dotenv.config();

const hre: HardhatRuntimeEnvironment = require("hardhat");

async function main(): Promise<void> {

  // let up means of interacting with the Goerli network
  const url = process.env.GOERLI_URL ? process.env.GOERLI_URL : "";
  let artifactsWinner = await hre.artifacts.readArtifact("WinnerTx");
  let artifactsContract = await hre.artifacts.readArtifact("Contract");
  const provider = new ethers.providers.JsonRpcProvider(url);
  let privateKey = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : "";
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create factoryContract object
  const factoryContract = new ethers.ContractFactory(artifactsContract.abi, artifactsContract.bytecode, wallet);
  // deploy an instance of Contract
  const contract = await factoryContract.deploy();
  await contract.deployed();
  // fetch address
  const contractAddress = contract.address;
  console.log("Contract deployed to:", contractAddress)

  // create an instance of the contract WinnerTx
  const factoryWinner = new ethers.ContractFactory(artifactsWinner.abi, artifactsWinner.bytecode, wallet);
  // deploy the WinnerTx contract with the contract's address 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502 for Alchemy's challenge
  // here I'll use my own deployment
  const winner = await factoryWinner.deploy(contractAddress);
  // wait for the contract deployment transaction to be included in a block
  await winner.deployed();
  // log the contract's address
  console.log("WinnerTx deployed to:", winner.address);

  // now call the callAttempt() function on our new contract
  const attempt = await winner.callAttempt();
  await attempt.wait();
  console.log("done.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
