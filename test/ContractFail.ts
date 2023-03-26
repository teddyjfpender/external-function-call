import { assert } from "chai";
import { ethers } from "hardhat";


describe("Test Winner Contract", function () {
    it("should not let the EOA who initiated the tx to to call `attempt`", async function () {
        // creates an ethers ContractFactory abstraction
        const winnerContract = await ethers.getContractFactory("Contract");

        // use the the ContractFactory object to deploy the an instance of the contract
        const contract = await winnerContract.deploy();

        // wait for the contract to be deployed
        await contract.deployed();

        // call the attempt function on the contract
        // catch the error to make sure it is correct
        try {
            const attempt = await contract.attempt();
            await attempt.wait();
            assert.fail("The `attempt()` function should have reverted")
        } catch (error: any) {
            assert.equal(error.message, "VM Exception while processing transaction: reverted with reason string 'msg.sender is equal to tx.origin'", "The revert reason is incorrect.");
        }

        return true;
    });
});