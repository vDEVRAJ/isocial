import React from "react";

function VaultEntryCard({ entry }) {
  const { content, emotion, timestamp } = entry;
  const formattedDate = new Date(timestamp).toLocaleString();

  const emotionColor = {
    "🌞 Light": "border-yellow-400",
    "🌑 Shadow": "border-gray-600",
    "🧿 Truth": "border-blue-500",
  };

  return (
    <div
      className={`border-l-4 p-3 mb-3 bg-white shadow rounded ${emotionColor[emotion] || "border-gray-400"}`}
    >
      <div className="text-sm text-gray-500 mb-1">{formattedDate}</div>
      <div className="font-semibold text-lg mb-1">{emotion}</div>
      <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
}

export default VaultEntryCard;
