# Simple Hardhat Project For Calling a Contract From a non-EOA

This project demonstrates a basic Hardhat use case where two contracts interact with each other. Specifically `Contract` contains a function `attempt()` that must be called by another smart contract. This smart contract is called `WinnerTx` and makes a call to `Contract` with its own function `callAttempt()`. This repository also contains a basic test to demonstrate that it is not possible for an EOA to call `attempt()` on a `Contract` instance. Add an `.env` file with `PRIVATE_KEY` anf `GOERLI_URL` defined.

Try running some of the following tasks:

```shell
npx hardhat run scripts/deployAndAttempt.ts --network goerli
npx hardhat test
```
