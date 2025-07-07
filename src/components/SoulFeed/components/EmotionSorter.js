import React from "react";

function EmotionSorter({ selected, onSelect }) {
  const emotions = ["All", "Light", "Shadow", "Truth"];

  return (
    <div className="flex gap-2 mb-4">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => onSelect(emotion)}
          className={`px-3 py-1 rounded-full border ${
            selected === emotion
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
}

export default EmotionSorter;
