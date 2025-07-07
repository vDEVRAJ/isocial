import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout/Layout";

// Pages
import Home from "./components/Home/Home";
import Shouts from "./components/Shouts/Shouts";
import Vault from "./components/Vault/Vault";
import SoulMirror from "./components/SoulMirror/SoulMirror";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shouts" element={<Shouts />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/soulmirror" element={<SoulMirror />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
