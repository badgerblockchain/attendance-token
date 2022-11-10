import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// have the FAQ be cards (3x6) that are hoverable
// add in a light / dark mode toggle
// /graph endpoint to see subgraphs
// link to our twitter (like ethleaderboard.xyz)
// have three boxes that say total unique address, total issues, total redeemed
// add footer with website by: , github: , and intital idea: , link to wesbtie:
function Footer() {
  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col>
          <h3>frequently asked </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
