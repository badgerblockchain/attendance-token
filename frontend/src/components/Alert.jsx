import React from "react";
import Alert from "react-bootstrap/Alert";

const CustomAlert = ({ message }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Alert variant="warning">{message}</Alert>
    </div>
  );
};

export default CustomAlert;
