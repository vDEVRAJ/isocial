import React, { useState } from "react";

const moods = ["All", "🧘 Calm", "💧 Sad", "🔥 Angry", "🌈 Joy", "🌑 Shadow"];

function MoodFilter({ onFilter }) {
  const [activeMood, setActiveMood] = useState("All");

  const handleSelect = (mood) => {
    setActiveMood(mood);
    if (onFilter) onFilter(mood);
  };

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => handleSelect(mood)}
          className={`px-3 py-1 rounded-full border ${
            activeMood === mood
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

export default MoodFilter;
