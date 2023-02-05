import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WalletTable from "../components/WalletTable";
import FAQ from "../components/Faq";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding"; // only executes if user doesn't have metamask install; add to package json
// TODO did not add: to README dependenciesnpm install @metamask/onboarding

// firebase imports
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
//import detectEthereumProvider from '@metamask/detect-provider' // LOOKING INTO SOMETHING -> npm i @metamask/detect-provider

import "../App.css"; // imports css styles

import image from "../badger_pic.png";

import Token from "../artifacts/contracts/BadgerToken.sol/BadgerToken.json";

// const { WALLET_PRIVATE_KEY, TOKEN_ADDRESS } = process.env; TODO look into how to use env vars

export default function Home() {
  const onboarding = new MetaMaskOnboarding(); // used to help user download metamask if not installed
  const hasMetaMask = useRef(false); // determines whether user should be linked to metamask install
  const [accountAddr, setAccountAddr] = useState(""); // used to store user wal

  let accounts;

  const addressCollectionRef = collection(db, "addresses");
  const totalAddressCollectionRef = collection(db, "all-addresses-ever");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClose = () => setShowError(false);
  const handleCloseSuccess = () => setShowSuccess(false);

  // https://docs.metamask.io/guide/create-dapp.html#project-setup   useful link to use understand how to use dapp in metamask

  // executes upon load and starts the executes isMetaMaskInstalled()
  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled();
  }, []);

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
      if (hasMetaMask.current === false) {
        // if false then chrome tab will open for you to download
      } else {
        // connects user wallet
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("user account: " + accounts); // used in debugging console
        alert("User's account " + accounts + " is connected");
        setAccountAddr(accounts); // sets the accountAddr to the user's account
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
  async function tokenTransfer() {
    if (typeof window.ethereum !== "undefined") {
      // line that checks if the user has Metamask installed; not bad to have double check
      //  const sender = "0xfe6d06170feaf0a8f63ebea5de3dd9232bfbc10b"             // account that holds all tokens; maybe have double checker later?
      const private_key =
        "0xfe50325739f44f5f7bdd8ff529a30a268e059c6118f4113d51d109d912b17f63"; // private key of wallet (TODO put in env and hide!)
      const provider = new ethers.providers.Web3Provider(window.ethereum); // step in obtaining contract var which can call the BadgerToken.sol methods

      // used for badger gretting, helpful comments
      // const signer = provider.getSigner()             // signer is used to make read/write changes on the blockchian while provider is only read
      const erc20_token = new ethers.Contract(accounts, Token.abi, provider); // signder or provder param determines if a read or read/write occurs
      // ^^ 2 lines above are important to explain

      try {
        for (let i = 0; i < erc20_token.address.length; i++) {
          // TODO figure out to get multiple contract address...
          console.log(erc20_token.address[i]);
        }
        const receiver = erc20_token.address[0];

        const tokenAddress = "0x7700D96fEa6337a6CA1B1704E3CdF066e965b73b"; // UPDATE EACH TIME NEW CONTRACT token addr obtained from deploy contract (put in env file)

        console.log(receiver);

        // connect to wallet with Badger Token
        const wallet_signer = new ethers.Wallet(private_key, provider); // hide private key
        // ^^ https://docs.ethers.io/v5/api/signer/#Wallet explains what a wallet object is

        // create new erc20 contract
        const contract = new ethers.Contract(
          tokenAddress,
          Token.abi,
          wallet_signer
        ); // explain Token.abi imported above and where it is located
        const decimals = await contract.decimals(); // decimal offset (18); makes it easy to use

        //const balance = await contract.balanceOf(sender)  // obtain balance of sender (helpful for debug)
        // console.log(ethers.utils.formatUnits(balance, decimals)) // displays master wallet's amount

        const amountToSend = "10"; // only send 1 token
        const tokens = ethers.utils.parseEther(amountToSend, decimals); // parses the amount to send

        // perform transaction; function found in BadgerToken.sol
        contract.transfer(receiver, tokens).then(function (tx) {
          console.log(tx);
        });

        alert(
          "Tokens successflly transfered. Please wait a couple minutes for your account to updated."
        ); // user success display message
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  const [faqs, setFaqs] = useState([
    {
      question: "what is badger blockchain?",
      answer:
        "Badger Blockchain is a student organization at the University of Wisconsin-Madison, educating students about blockchain technology and its applications.",
      open: false,
    },
    {
      question: "how do you use this app?",
      answer:
        "Connect your wallet using the connect button, if you don't have a wallet, download metamask. Once connected, you will recieve 10 tokens.",
      open: false,
    },
    {
      question: "what do the tokens do?",
      answer:
        "Once you have 100 tokens, you can transfer them back to our custudial wallet, and you will recieve either a Badger Blockchain NFT, 1 free slice of Ian's Pizza, or 3 free Greenbush donuts.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  const addAddressToFirebase = async () => {
    console.log("adding address to firebase");
    if (!accountAddr) {
      console.log("not connected!");
      setShowError(true);
      return;
    }

    // TODO DO NOT ADD DUPLICATES
    // add to queue, which is cleared after every airdrop
    await addDoc(addressCollectionRef, {
      address: accountAddr.toString(),
      timestamp: Date.now(),
    });

    // add to total collection, so we can tell every address that has claimed
    await addDoc(totalAddressCollectionRef, {
      address: accountAddr.toString(),
      timestamp: Date.now(),
    });

    setShowSuccess(true);
  };
  return (
    <div className="App">
      <Container fluid>
        <Header />
        <Row>
          <Col className="d-flex justify-content-center" xs={12}>
            <Button className="m-3" variant="primary" onClick={onClickConnect}>
              connect
            </Button>
            <Button
              className="m-3"
              variant="danger"
              onClick={addAddressToFirebase}
            >
              claim
            </Button>
          </Col>
        </Row>
        <Row>
          {accountAddr ? (
            <h6 className="d-flex justify-content-center">
              👌 Your account: {accountAddr}
            </h6>
          ) : null}
        </Row>
        <WalletTable />
        <Row>
          {faqs.map((faq, index) => (
            <Col sm={4} className="faqs" key={index}>
              <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            </Col>
          ))}
        </Row>
        <Footer />

        {/* Alert Modal for Address Connection Error*/}
        <Modal show={showError} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You Need To Connect First!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Uh Oh Looks Like You Need To Connect Your Wallet First 😕!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Alert Modal for Address Connection Success*/}
        <Modal show={showSuccess} onHide={handleCloseSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've been added to the queue to redeem your tokens! Please wait.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
