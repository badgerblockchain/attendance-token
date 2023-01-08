import React from "react";
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
