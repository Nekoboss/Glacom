import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes/index.js";

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;
