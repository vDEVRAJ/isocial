// src/components/Shouts/components/ShoutComposer.js

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";

function ShoutComposer() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("Soul");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to shout.");
      return;
    }

    if (!text.trim()) return;

    setLoading(true);

    try {
      // 1️⃣ Save to shouts collection
      const shoutRef = await addDoc(collection(db, "shouts"), {
        uid: user.uid,
        text,
        mood,
        createdAt: serverTimestamp(),
      });

      // 2️⃣ Update publicPosts[] array in user's profile
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        publicPosts: arrayUnion({
          id: shoutRef.id,
          type: "shout",
          mood,
          preview: text.slice(0, 100),
          createdAt: Date.now(),
        }),
      });

      toast.success("🗣️ Shout posted!");
      setText("");
      setMood("Soul");
    } catch (error) {
      console.error("Error posting shout:", error);
      toast.error("Failed to post shout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md space-y-4">
      <textarea
        placeholder="Speak your truth..."
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      {/* Mood Selection */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-semibold">Mood:</span>
        <button
          onClick={() => setMood("Soul")}
          className={`px-3 py-1 rounded-full text-sm ${
            mood === "Soul"
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
        >
          💚 Soulful
        </button>
        <button
          onClick={() => setMood("Shadow")}
          className={`px-3 py-1 rounded-full text-sm ${
            mood === "Shadow"
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
        >
          🖤 Shadowed
        </button>
      </div>

      <button
        onClick={handlePost}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Shout"}
      </button>
    </div>
  );
}

export default ShoutComposer;
