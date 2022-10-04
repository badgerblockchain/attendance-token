import { useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import {Helmet} from "react-helmet";
import MetaMaskOnboarding from '@metamask/onboarding'; // only executes if user doesn't have metamask install; add to package json
// TODO did not add: to README dependenciesnpm install @metamask/onboarding

//import detectEthereumProvider from '@metamask/detect-provider' // LOOKING INTO SOMETHING -> npm i @metamask/detect-provider

import './App.css'; // imports css styles

import image from './badger_pic.png'

import Token from './artifacts/contracts/BadgeToken.sol/BadgeToken.json'

// const { WALLET_PRIVATE_KEY, TOKEN_ADDRESS } = process.env; TODO look into how to use env vars


function App() {

  const onboarding = new MetaMaskOnboarding();         // used to help user download metamask if not installed
  const hasMetaMask = useRef(false)                    // determines whether user should be linked to metamask install

  let accounts;

  // https://docs.metamask.io/guide/create-dapp.html#project-setup   useful link to use understand how to use dapp in metamask 
  
  // executes upon load and starts the executes isMetaMaskInstalled()
  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled()
  },[]);

  // checks if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask); // returns false if metamask is not installed; else true
  };

// Executes when "Connect Wallet" gets clicked. Checks if a user has the metamask extension. If not a 
// tab gets opened taking them to the web store where they can download it. If the user has a metamask account
// ethers will use window.ethereum to see which accounts are conencted to the site. If this is a user's first time
// connecting metamask will open a page for them to select a wallet (make sure to pick the one you imported tokens to!)
// If a user was connected from before a message will be displayed indicating what their account addr is
  const onClickConnect = async () => {
    try {
      if(hasMetaMask.current === false){ // if false then chrome tab will open for you to download
      }
      else{ // connects user wallet
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("user account: " + accounts) // used in debugging console
        alert("User's account " + accounts + " is connected")
      }
      // Will open the MetaMask UI
      // You should disable this button while the request is pending! -why?
      
    } catch (error) {
      console.error(error);
    }
  };

  // Function executes when "Trasnfer Token" is clicked. Calls the smart contract
  //
  // TODO add better header description
  async function tokenTransfer(){
    if (typeof window.ethereum !== 'undefined') {       // line that checks if the user has Metamask installed; not bad to have double check
    //  const sender = "0xfe6d06170feaf0a8f63ebea5de3dd9232bfbc10b"             // account that holds all tokens; maybe have double checker later?
      const private_key = "0xfe50325739f44f5f7bdd8ff529a30a268e059c6118f4113d51d109d912b17f63" // private key of wallet (TODO put in env and hide!)
      const provider = new ethers.providers.Web3Provider(window.ethereum)       // step in obtaining contract var which can call the BadgeToken.sol methods

      // used for badger gretting, helpful comments
    // const signer = provider.getSigner()             // signer is used to make read/write changes on the blockchian while provider is only read
     const erc20_token = new ethers.Contract(accounts, Token.abi, provider) // signder or provder param determines if a read or read/write occurs
      // ^^ 2 lines above are important to explain
      
      try {
        for(let i = 0; i < erc20_token.address.length; i++){ // TODO figure out to get multiple contract address...
          console.log(erc20_token.address[i])
        }
        const receiver = erc20_token.address[0]

        const tokenAddress = "0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b" // UPDATE EACH TIME NEW CONTRACT token addr obtained from deploy contract (put in env file)
        
        console.log(receiver)

        // connect to wallet with Badge Token
        const wallet_signer = new ethers.Wallet(private_key, provider) // hide private key 
        // ^^ https://docs.ethers.io/v5/api/signer/#Wallet explains what a wallet object is

        // create new erc20 contract
        const contract = new ethers.Contract(tokenAddress,Token.abi, wallet_signer) // explain Token.abi imported above and where it is located
        const decimals = await contract.decimals()  // decimal offset (18); makes it easy to use
        
        //const balance = await contract.balanceOf(sender)  // obtain balance of sender (helpful for debug)
       // console.log(ethers.utils.formatUnits(balance, decimals)) // displays master wallet's amount

        const amountToSend = '10'  // only send 1 token
        const tokens =  ethers.utils.parseEther(amountToSend, decimals) // parses the amount to send

        // perform transaction; function found in BadgeToken.sol
        contract.transfer(receiver, tokens)
        .then(function(tx){
          console.log(tx)
        })
       
        alert("Tokens successflly transfered. Please wait a couple minutes for your account to updated.") // user success display message

      } catch (err) {
        console.log("Error: ", err)
      }
    } 
  }
  
 ////**** return function at the bottom drives the rest of the code ****////
  return (
    
    <div className="App">
      <Helmet>
        <title>Badger Blocks</title> {/* text that is on the chrome tab */}
      </Helmet>
      <header className="App-header">
        <img src={image} alt=""/>
        <h1 className ='primary'>Attendance Reward</h1>
        <button className="connect_wallet" onClick={onClickConnect}>Connect Wallet</button> 
          <button className="btn_props" onClick={tokenTransfer}>Get BadgeToken</button> {/*when button is clicked it transfers tokens to user wallet */}
          <div id = "set"></div>
      </header>
    </div>
  );

}
export default App;


// TODO add display of top 10 wallets 
// ethers method: signer.getBalance( [ blockTag = "latest" ] ) ⇒ Promise< BigNumber >source
// Returns the balance of this wallet at blockTag.

// could be helpful