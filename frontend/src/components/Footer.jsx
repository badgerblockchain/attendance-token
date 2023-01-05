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

import "./components.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div>
        <p className="footer-text">
          Designed by <span className="bb-color">Badger Blockchain</span>{" "}
          (thanks to Hunter, Jack, and Ben)
        </p>
        <p className="footer-text">Last updated: January 2023</p>
        <p className="footer-text">Copyright © {year}</p>
      </div>
    </div>
  );
}
