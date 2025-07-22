// src/components/Shouts/Shouts.js
import React, { useState } from "react";
import ShoutCard from "./components/ShoutCard";
import ShoutComposer from "./components/ShoutComposer";

const mockShouts = [
  {
    id: "1",
    username: "NightWhisper",
    avatar: "https://i.pravatar.cc/150?img=10",
    mood: "Soul",
    text: "I forgave myself today for something I held for 10 years.",
    likes: 12,
    comments: 3,
    views: 105,
    timestamp: Date.now() - 60 * 1000,
  },
  {
    id: "2",
    username: "LightSeeker",
    avatar: "https://i.pravatar.cc/150?img=5",
    mood: "Shadow",
    text: "I don't know who I am without my pain. But I'm learning.",
    likes: 7,
    comments: 1,
    views: 87,
    timestamp: Date.now() - 5 * 60 * 1000,
  },
  {
    id: "3",
    username: "TruthWanderer",
    avatar: "https://i.pravatar.cc/150?img=7",
    mood: "Soul",
    text: "Shared a truth today that left me trembling.",
    likes: 21,
    comments: 4,
    views: 152,
    timestamp: Date.now() - 10 * 60 * 1000,
  },
];

function Shouts() {
  const [shouts, setShouts] = useState(mockShouts);
  const [currentSlide, setCurrentSlide] = useState("Soul");
  const [showModal, setShowModal] = useState(false);

  const filtered = shouts
    .filter((s) => s.mood === currentSlide)
    .sort((a, b) => b.timestamp - a.timestamp);

  const handlePost = (newShout) => {
    const shoutWithMeta = {
      ...newShout,
      id: `${Date.now()}`,
      avatar: "https://i.pravatar.cc/150?img=20",
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      views: 0,
    };
    setShouts([shoutWithMeta, ...shouts]);
    setShowModal(false); // Close modal after posting
  };

  return (
    <div className="relative max-w-2xl mx-auto p-4 bg-white dark:bg-zinc-900 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
        🗣️ Shouts Feed
      </h2>

      {/* Mood Filter Buttons */}
      <div className="flex justify-center space-x-2 mt-2 mb-4">
        <button
          onClick={() => setCurrentSlide("Soul")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            currentSlide === "Soul"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
        >
          💚 Soul Stream
        </button>
        <button
          onClick={() => setCurrentSlide("Shadow")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            currentSlide === "Shadow"
              ? "bg-red-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
        >
          🖤 Shadow Stream
        </button>
      </div>

      {/* Shout Feed */}
      <div className="space-y-6">
        {filtered.length > 0 ? (
          filtered.map((shout) => <ShoutCard key={shout.id} shout={shout} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No {currentSlide.toLowerCase()} shouts yet.
          </p>
        )}
      </div>

      {/* ➕ Floating Action Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-lg transition-all duration-300"
      >
        +
      </button>

      {/* 📢 Shout Composer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-lg w-full shadow-xl space-y-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-xl text-gray-400 hover:text-red-500"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
              ✍️ Who Shouted?
            </h3>
            <ShoutComposer onPost={handlePost} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Shouts;
