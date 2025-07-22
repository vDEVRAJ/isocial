// src/components/Auth/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("✨ Logged in successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg shadow-lg max-w-sm w-full space-y-5"
      >
        <h2 className="text-xl font-semibold text-center">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-medium"
        >
          Login
        </button>

        <p className="text-center text-xs text-zinc-500">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-indigo-600 dark:text-indigo-300">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
