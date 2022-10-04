# BadgeToken

Reward token and website interface for the [Badger Blockchain Club](https://www.badgerblockchain.com/) at UW_Madison.

- Read [Development Guide](https://github.com/badgerblockchain/development-guide/blob/main/introduction.md), then follow the quick start guide below.
  - The repo we are using is found [here](https://github.com/badgerblockchain/attendance-token)


## Requirements
Follow the links to install if you don't have the project requirements installed on your machine.

- [Visual Studio Code IDE](https://code.visualstudio.com/download)
  - solidity extension from vscode marketplace
- [git](https://git-scm.com/downloads)
- [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) node v16.16.0, npm v8.11.0
  - On windows you need to add Node to env vars [stack overflow answer](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10/27864253#27864253) may help

## Getting Started
1. Clone the Project
   
   Go to the [token](https://github.com/badgerblockchain/attendance-token) repository and clone on your local machine with:
```
git clone https://github.com/badgerblockchain/attendance-token.git
cd attendance-token
```
2. Install local instance of Hardhat
```
npm install
```
3. Install the dependencies outlined in [package.json](package.json) using npm.
4. To start the app use:
```bash
cd frontend
npm install
npm start
```
The local instance of the website should launch after the npm start cmd is executed.
- only need to use **npm install** on the first run

## Frontend
1. Import Tokens to Metamask
  On your Metamask click on "import token" on the groeli network. Use the below address:
     - 0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b
2. Make sure you are on the Goerli TestNet -> TODO show how to add w pictures
3. Click on Connect Wallet, and make sure the wallet is connected to goerli and the tokens have been imported
4. Click on Attendance Reward. Tokens should be transfered to your account!




### This is a work in progress readme, TODO ADD PICTURES, better descriptions, ensure all dependencies are accounted for 


**RANDOM NOTES to be used in development**

Deploys a new token to the goerli testnet:

```
npx hardhat run scripts/deploy_token.js --network goerli
```

https://vittominacori.github.io/watch-token/create/ (TODO figure out how to add image to token)


VIDEO I HAVE BEEN WATCHING:
https://www.youtube.com/watch?v=c8Pkz1NqWNw

# IN PROGRESS
- only use one contract called BadgeTest(update the name)
- After the contract is deployed look it up on etherscan and set up the "contract" (make sure to user compiler 0.8.3)
- check behavior by starting site and clicking button
- put private keys in env vars
## USER ONLY CAN CLICK ONCE PER MEETING IF THEY ARE IN THE LOCATION
## CONNECT BACKEND TO HUNTER'S FRONTEND
## REDEEM BUTTON TRANSFERS TOKEN BACK TO MAIN WALLET

