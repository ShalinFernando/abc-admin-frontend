import React from "react";
import { Router } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import History from "./services/History";
function App() {

  return (
    <Router history={History}>
      <Routes />
    </Router>
  );
}

export default App;
