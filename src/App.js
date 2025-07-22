// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// 🧩 Core Pages
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
import EditProfile from "./components/SoulProfiles/components/EditProfile"; // ✅ NEW
import EchoThread from "./components/Shouts/EchoThread";
import Manifesto from "./components/Manifesto/Manifesto";
import Layout from "./components/Layout/Layout";

// 🔐 Auth Pages
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

// 🔔 Toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔐 Route protection wrapper
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [showManifesto, setShowManifesto] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (showManifesto) {
    return <Manifesto onComplete={() => setShowManifesto(false)} />;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors">
        <Router>
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/shout/:id" element={<EchoThread />} />

            {/* 🔐 Private Routes */}
            <Route
              element={
                <PrivateRoute user={user}>
                  <Layout toggleTheme={toggleTheme} />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
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
              <Route path="/edit-profile" element={<EditProfile />} /> {/* ✅ NEW ROUTE */}
              <Route path="*" element={<h1 className="text-center text-red-500">404 — Page Not Found</h1>} />
            </Route>
          </Routes>
        </Router>

        {/* 🔔 Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;
