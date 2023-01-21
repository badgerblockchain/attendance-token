import React from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import "./App.css"; // imports css styles

const theme = createTheme({
  typography: {
    fontFamily: '"Trebuchet MS", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/todo" element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
