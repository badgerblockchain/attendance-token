import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// firebase imports
import { db } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

import DataTableAll from "../components/DataTableAll";
import DataTableQueue from "../components/DataTableQueue";
import "./Pages.css";

export default function Admin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const addressCollectionRef = collection(db, "addresses");

  useEffect(() => {
    const getAddresses = async () => {
      const data = await getDocs(addressCollectionRef);
      console.log(data);
      setAddresses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const querySnapshot = await getDocs(addressCollectionRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setAddresses(doc.data());
        console.log(doc.data());
        console.log("here are the things in your db", addresses);
      });
    };

    getAddresses();
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

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div class="page-header">
            <h1 className="header">Admin Dashboard</h1>
            <Button className="home-btn" onClick={handleClick}>
              Main Page
            </Button>
            <Button className="home-btn" variant="danger" onClick={handleShow}>
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
        {metrics.map((metric, index) => (
          <Col key={metric.id}>
            <div className="metrics-card">
              <h3 className="metrics-title">{metric.title}</h3>
              <p className="metrics-numbers">{metric.url}</p>
            </div>
          </Col>
        ))}
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
          Are you sure you want to airdrop "num_tokens" to "num_addresses"{" "}
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
