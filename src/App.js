import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Shouts from "./components/Shouts/Shouts";
import Vault from "./components/Vault/Vault";
import SoulMirror from "./components/SoulMirror/SoulMirror";
import Notifications from "./components/Notifications/Notifications";
import SoulChat from "./components/SoulChat/SoulChat";
import SoulTags from "./components/SoulTags/SoulTags";
import Stories from "./components/Stories/Stories";
import TimeCapsules from "./components/TimeCapsules/TimeCapsules";
import SoulFeed from "./components/SoulFeed/SoulFeed";
import SoulGarden from "./components/SoulGarden/SoulGarden";
import XPSystem from "./components/XPSystem/XPSystem";
import SoulProfiles from "./components/SoulProfiles/SoulProfiles";
import Manifesto from "./components/Manifesto/Manifesto";
import Layout from "./components/Layout/Layout";

function App() {
  const [showManifesto, setShowManifesto] = useState(true); // simulate first-time view

  if (showManifesto) {
    return <Manifesto onComplete={() => setShowManifesto(false)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shouts" element={<Shouts />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/soul" element={<SoulMirror />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<SoulChat />} />
          <Route path="/tags" element={<SoulTags />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/capsules" element={<TimeCapsules />} />
          <Route path="/feed" element={<SoulFeed />} />
          <Route path="/garden" element={<SoulGarden />} />
          <Route path="/xp" element={<XPSystem />} />
          <Route path="/soul/:handle" element={<SoulProfiles />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
