import React from "react";

const modes = [
  "🪞 Gita",
  "⚔️ Mahabharata",
  "🔥 Shiv Puran",
  "📖 Bible",
  "☪️ Quran",
  "🌊 Tao",
  "🕶 Shadow",
];

function ModeSelector({ selectedMode, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className={`px-3 py-1 rounded-full border text-sm ${
            selectedMode === mode
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

export default ModeSelector;
