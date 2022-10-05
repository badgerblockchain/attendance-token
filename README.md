# BadgeToken

Reward token and website interface for the [Badger Blockchain Club](https://www.badgerblockchain.com/) at UW-Madison.

View the BadgeToken on [Goerli TestNet etherscan](https://goerli.etherscan.io/token/0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b).

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
1. Switch to the Goerli test network by opening MetaMask. If you do not see Goerli, then click on **Show/hide test networks** and toggle the option to "on". Goerli should populate in the list of testnets. 
2. Import Token to Metamask by clicking on **Import Token** on the Goerli testnet. Use the following address `0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b`.
     
<img width="365" alt="Screen Shot 2022-10-05 at 2 25 29 PM" src="https://user-images.githubusercontent.com/71794995/194145468-41a35964-a359-448e-8d7c-3d475d7a850d.png">

3. Copy and Paste the token address into the first box. The rest of the boxes should autofill. Then **Add custom token**.

<img width="341" alt="Screen Shot 2022-10-05 at 2 25 38 PM" src="https://user-images.githubusercontent.com/71794995/194145535-cafaf632-ea71-4399-abd8-6880970967ec.png">

4. Click on Connect Wallet, and make sure the wallet is connected to Goerli and the tokens have been imported
5. Click on Attendance Reward. Tokens should be transfered to your account!




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

