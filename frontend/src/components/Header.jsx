import React from "react";
import "./components.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Container className="d-flex p-3 justify-content-center">
      <Row>
        <Col xs={12}>
          <h1>
            {" "}
            <span className="bb-color">badger blockchain</span> token dashboard{" "}
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
