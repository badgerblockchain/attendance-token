# BadgeToken

Reward token and website interface for the [Badger Blockchain Club](https://www.badgerblockchain.com/) at UW_Madison.


Will need user to manually add token and faucet goerli to account

**NEED TO IMPORT TOKEN TO SEE FUNCTION AND BE ON GOERLI TESTNET**'
  - token address to import 0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b

## Requirements
Follow the links for instructions to install if you don't have the project requirements installed on your machine.

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v8.11.0
- [node](https://nodejs.org/en/download/) v16.16.0
- [react](https://reactjs.org/versions/) v^18.1.0
- [dotenv](https://pypi.org/project/python-dotenv/)
- solidity from vscode marketplace

## Getting Started
1. Install the dependencies outlined in [package.json](package.json) using npm.
Download hardhat with npm and install the rest of the dependencies from the .json above

```bash
npm install
```
2. To start the app use:
```bash
cd frontend
npm install
npm start
```
only need to use **nppm install** on the first run

**TODO**


**RANDOM NOTES**


To deploy a new token to the goerli testnet use cmmd:

```
npx hardhat run scripts/deploy_token.js --network goerli
```

https://vittominacori.github.io/watch-token/create/ (website to add image)


https://www.youtube.com/watch?v=ipKCKB3PCpk
https://github.com/mikec3/my_tutorials/blob/master/simple_token_wallet/src/Wallet.js



VIDEO I HAVE BEEN WATCHING:
https://www.youtube.com/watch?v=c8Pkz1NqWNw

# TODO
- only use one contract called BadgeTest(update the name)
- After the contract is deployed look it up on etherscan and set up the "contract" (make sure to user compiler 0.8.3)
- check behavior by starting site and clicking button
- put private keys in env vars
## USER ONLY CAN CLICK ONCE PER MEETING IF THEY ARE IN THE LOCATION
## CONNECT BACKEND TO HUNTER'S FRONTEND
## REDEEM BUTTON TRANSFERS TOKEN BACK TO MAIN WALLET

