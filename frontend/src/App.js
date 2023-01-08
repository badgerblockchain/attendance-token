import React from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css"; // imports css styles

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/todo" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
