import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";

import MetaMaskOnboarding from "@metamask/onboarding";
// our imports
import Token from "../artifacts/contracts/BadgeToken.sol/BadgeToken.json";
import AddressResolver from "./AddressResolver";
import DateResolver from "./DateResolver";
import { gql, useQuery } from "@apollo/client";

function WalletTable() {
  const onboarding = new MetaMaskOnboarding(); // used to help user download metamask if not installed
  const hasMetaMask = useRef(false); // determines whether user should be linked to metamask install
  // used in onClickConnect
  let accounts;

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
      const provider = new ethers.providers.Web3Provider(window.ethereum); // step in obtaining contract var which can call the BadgeToken.sol methods

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

        // connect to wallet with Badge Token
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

        // perform transaction; function found in BadgeToken.sol
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

  // Define our Query
  const top10HoldersQuery = gql`
    query getTop10Holders(
      $first: Int!
      $orderBy: String!
      $orderDirection: String!
      $timestamp: String!
      $asc: String!
    ) {
      holders(
        first: $first
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        id
        balance
        receives(orderBy: $timestamp, orderDirection: $asc) {
          id
          timestamp
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(top10HoldersQuery, {
    variables: {
      first: 10,
      orderBy: "balance",
      orderDirection: "desc",
      timestamp: "timestamp",
      asc: "asc",
    },
  });

  // executes upon load and starts the executes isMetaMaskInstalled()
  useEffect(() => {
    hasMetaMask.current = isMetaMaskInstalled();
  }, []);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col className="d-flex justify-content-center" xs={12}>
          <Button className="m-3" variant="primary" onClick={onClickConnect}>
            connect
          </Button>
          <Button className="m-3" variant="danger" onClick={tokenTransfer}>
            claim
          </Button>
        </Col>
        <Col className="d-flex justify-content-center" xs={12}>
          <h3> dashboard </h3>
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Wallet's</th>
                <th>Number of Tokens</th>
                <th>Date of First Token</th>
              </tr>
            </thead>
            <tbody>
              {data.holders.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <AddressResolver id={item.id} />
                  </td>
                  <td>{item.balance}</td>
                  <td>
                    <DateResolver randomDate={item.receives[0].timestamp} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default WalletTable;
