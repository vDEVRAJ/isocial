import React, { useState } from "react";

function PlantComposer({ onPlant }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) return;
    const newSeed = {
      id: Date.now(),
      title,
      message,
      level: 1, // simulate starting growth
    };
    onPlant(newSeed);
    setTitle("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        type="text"
        placeholder="Seed title (e.g. ‘Be Free’, ‘Heal Dad’)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />
      <textarea
        placeholder="What dream, memory or prayer do you want to plant?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Plant Seed
      </button>
    </form>
  );
}

export default PlantComposer;
