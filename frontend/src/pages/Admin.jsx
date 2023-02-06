import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// firebase imports
import { db } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

// material ui imports
//import { Card, CardActions, CardContent, Typography } from "@mui/material";

// ethers import
import { ethers } from "ethers";


import DataTableAll from "../components/DataTableAll";
import DataTableQueue from "../components/DataTableQueue";
import Alert from "../components/Alert";
import Card from "../components/Card";
import "./Pages.css";

export default function Admin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const addressCollectionRef = collection(db, "addresses");
  const totalAddressCollectionRef = collection(db, "all-addresses-ever");
  const whitelistAddresses = ["0x123547171488c7CE7c811127eF7452B74E20D9D9"].map(
    (v) => v.toLowerCase()
  );
  const { ethereum } = window;
  const [size, setSize] = useState(0);
  const [uniqueSize, setUniqueSize] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const contractAddress = "0xEFf3485745a32a93788eB7cC249A534F77682522";
  const ERC20_ABI = [
    "function transfer(address _to, uint256 _value) public returns (bool success)",
    "function bulkTransfer(address[] memory addresses, uint tokensEach) public returns (bool success)",
  ]
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  const determineAuthorized = async () => {
    const accountAddr = await provider.send("eth_requestAccounts", []);

    if (whitelistAddresses.includes(accountAddr[0])) {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    const getAddresses = async () => {
      const data = await getDocs(addressCollectionRef);
      setAddresses(data.docs.map((doc) => doc.data().address));

      const querySnapshot = await getDocs(addressCollectionRef);
      
      setSize(querySnapshot.size);
      const querySnapshot2 = await getDocs(totalAddressCollectionRef);
      setUniqueSize(querySnapshot2.size);
    };

    getAddresses();
    determineAuthorized();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    navigate("/");
  }

  const handleAirdrop = async () => {
    console.log("Starting airdrop");
    const contractWithWallet = contract.connect(signer);
    const tx = await contractWithWallet.bulkTransfer(addresses, ethers.utils.parseUnits((size/addresses.length).toString(), "ether")); 
    await tx.wait();
    console.log("Airdrop complete!");
    setShow(false);
  }

  const metrics = [
    {
      id: 1,
      title: "total tokens to airdrop",
      url: "24",
    },
    {
      id: 2,
      title: "total requesters / attendees",
      url: "12",
    },
    {
      id: 3,
      title: "total tokens in cirulation",
      url: "10089",
    },
    {
      id: 4,
      title: "total unique addresses",
      url: "67",
    },
    {
      id: 5,
      title: "average attendees",
      url: "22",
    },
  ];

  const handleDeleteAddresses = async () => {
    const querySnapshot = await getDocs(collection(db, "addresses"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      deleteDoc(doc.ref);
    });
    window.location.reload();
  };

  if (!authorized) {
    return <Alert message="you are not authorized to view this page!"></Alert>;
  } else {
    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <div class="page-header">
              <h1 className="header">Admin Dashboard</h1>
              <Button className="home-btn" onClick={handleClick}>
                Main Page
              </Button>
              <Button
                className="home-btn"
                variant="danger"
                onClick={handleShow}
              >
                Airdrop Token
              </Button>
              <Button
                className="home-btn"
                variant="secondary"
                onClick={handleDeleteAddresses}
              >
                Delete Addresses in Queue
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="">
          <Col sm={6}>
            <Card title="total tokens to airdrop" number={size} />
          </Col>
          <Col sm={6}>
            <Card title="total unique addresses" number={uniqueSize} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2 className="header"> Addresses in Queue </h2>
            <DataTableQueue />
          </Col>
          <Col md={6}>
            <h2 className="header"> All Info </h2>
            <DataTableAll />
          </Col>
        </Row>

        {/* Modal for Airdrop confirmation*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Airdrop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to airdrop "num_tokens" to {size} addresses?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleAirdrop}>
              Yes, Airdrop
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
