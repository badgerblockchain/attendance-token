import { useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

function WalletTable() {
  const onboarding = new MetaMaskOnboarding(); // used to help user download metamask if not installed
  const hasMetaMask = useRef(false); // determines whether user should be linked to metamask install
  // used in onClickConnect
  let accounts;
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
      }
      // Will open the MetaMask UI
      // You should disable this button while the request is pending! -why?
    } catch (error) {
      console.error(error);
    }
  };

  const data = [
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
    {
      "Wallet Address": 0x1525,
      "Number of Tokens": 10000,
      "Date of First Token": "05/12/2022",
    },
  ];
  return (
    <Container className="d-flex p-3 justify-content-center">
      <Row>
        <Col className="d-flex p-3 justify-content-center" xs={12}>
          <Button variant="primary" onClick={onClickConnect}>
            connect{" "}
          </Button>
          <Button variant="danger">claim </Button>
        </Col>
        <Col className="d-flex p-3 justify-content-center" xs={12}>
          <h3> dashboard </h3>
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Wallet Addr</th>
                <th>Number of Tokens</th>
                <th>Date of First Token</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{items["Wallet Address"]}</td>
                  <td>{items["Number of Tokens"]}</td>
                  <td>{items["Date of First Token"]}</td>
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
