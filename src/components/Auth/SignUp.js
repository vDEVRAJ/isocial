import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [handleStatus, setHandleStatus] = useState(""); // live availability
  const [checkingHandle, setCheckingHandle] = useState(false);

  const navigate = useNavigate();

  // 🔍 Live handle check (debounced)
  useEffect(() => {
    if (!handle.trim()) {
      setHandleStatus("");
      return;
    }

    const delay = setTimeout(async () => {
      setCheckingHandle(true);
      const formatted = handle.trim().toLowerCase();
      const handleRef = doc(db, "userHandles", formatted);
      const handleSnap = await getDoc(handleRef);
      setHandleStatus(handleSnap.exists() ? "taken" : "available");
      setCheckingHandle(false);
    }, 600);

    return () => clearTimeout(delay);
  }, [handle]);

  // 🧠 Signup logic
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !handle.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    if (handleStatus === "taken") {
      toast.error("This soul handle is already taken.");
      return;
    }

    try {
      const formattedHandle = handle.trim().toLowerCase();

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCred.user;

      await updateProfile(user, { displayName: name.trim() });

      // 🔥 Write user profile
      const userData = {
        name: name.trim(),
        email: email.trim(),
        handle: formattedHandle,
        xp: 0,
        bio: "",
        kaQuote: "",
        photoURL: user.photoURL || "",
        soulTags: [],
        publicPosts: [],
        followers: [],
        following: [],
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // 🔗 Link handle → UID
      await setDoc(doc(db, "userHandles", formattedHandle), {
        uid: user.uid,
      });

      // ⏳ Confirm both documents are ready
      const waitForProfileReady = async () => {
        for (let i = 0; i < 15; i++) {
          const [handleSnap, userSnap] = await Promise.all([
            getDoc(doc(db, "userHandles", formattedHandle)),
            getDoc(doc(db, "users", user.uid)),
          ]);
          if (
            handleSnap.exists() &&
            handleSnap.data().uid === user.uid &&
            userSnap.exists()
          ) {
            return true;
          }
          await new Promise((res) => setTimeout(res, 400));
        }
        return false;
      };

      const confirmed = await waitForProfileReady();

      if (confirmed) {
        toast.success("🎉 Account created!");
        navigate(`/soul/${formattedHandle}`);
      } else {
        toast.warning("Account created, syncing soul... try again shortly.");
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black px-4">
      <form
        onSubmit={handleSignUp}
        className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg shadow-lg max-w-sm w-full space-y-5"
      >
        <h2 className="text-xl font-semibold text-center">
          Create Your Soul Profile
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <input
            type="text"
            placeholder="Choose Soul Handle (e.g. devraj)"
            className="w-full px-4 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm"
            value={handle}
            onChange={(e) => setHandle(e.target.value.toLowerCase())}
          />
          {handle && (
            <p className="text-xs mt-1 ml-1">
              {checkingHandle ? (
                <span className="text-blue-500">Checking availability...</span>
              ) : handleStatus === "taken" ? (
                <span className="text-red-500">Handle already taken ❌</span>
              ) : (
                <span className="text-green-500">Available ✅</span>
              )}
            </p>
          )}
        </div>

        <input
          type="email"
          placeholder="Email Address"
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
          disabled={handleStatus === "taken"}
          className={`w-full ${
            handleStatus === "taken"
              ? "bg-zinc-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white py-2 rounded text-sm font-medium transition`}
        >
          Sign Up
        </button>

        <p className="text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="underline text-indigo-600 dark:text-indigo-300">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
