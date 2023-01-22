import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// firebase imports
import { db } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

// material ui imports
//import { Card, CardActions, CardContent, Typography } from "@mui/material";

import DataTableAll from "../components/DataTableAll";
import DataTableQueue from "../components/DataTableQueue";
import Alert from "../components/Alert";
import Card from "../components/Card";
import "./Pages.css";

export default function Admin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const addressCollectionRef = collection(db, "addresses");
  const totalAddressCollectionRef = collection(db, "all-addresses-ever");
  const whitelistAddresses = ["0xf78d0E652D3471cda42E02B6D0964820F87A8126"].map(
    (v) => v.toLowerCase()
  );
  const { ethereum } = window;
  const [size, setSize] = useState(0);
  const [uniqueSize, setUniqueSize] = useState(0);

  const determineAuthorized = async () => {
    const accountAddr = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("acccountAddr:", accountAddr[0]);
    console.log(whitelistAddresses[0]);
    if (whitelistAddresses.includes(accountAddr[0])) {
      console.log("you are authorized with:", accountAddr[0]);
      setAuthorized(true);
    }
    console.log("you are not authorized with:", accountAddr[0]);
  };

  useEffect(() => {
    const getAddresses = async () => {
      const data = await getDocs(addressCollectionRef);
      //console.log(data);
      setAddresses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const querySnapshot = await getDocs(addressCollectionRef);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setAddresses(doc.data());
      });
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

  function handleAirdrop() {
    console.log("they really want to airdrop");
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
