import React from "react";

function SeedCard({ seed }) {
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-xl shadow-md border border-indigo-200 hover:scale-105 transition">
      <h2 className="text-lg font-semibold text-indigo-700 mb-2">
        🌱 {seed.title}
      </h2>
      <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
        {seed.message}
      </p>
      <p className="text-xs text-indigo-400">Growth: Level {seed.level}</p>
    </div>
  );
}

export default SeedCard;
