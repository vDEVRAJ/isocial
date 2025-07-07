import React from "react";

function ArchiveItem({ entry }) {
  const emotionColors = {
    Light: "bg-green-100 text-green-700",
    Shadow: "bg-gray-100 text-gray-700",
    Truth: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="p-4 mb-4 border-l-4 border-indigo-500 rounded shadow-sm">
      <div className="text-xs text-gray-500 mb-1 flex justify-between">
        <span>{entry.type}</span>
        <span className="italic">{new Date(entry.date).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap mb-2">{entry.content}</p>
      <span
        className={`text-xs px-2 py-1 rounded-full ${emotionColors[entry.emotion]}`}
      >
        {entry.emotion}
      </span>
    </div>
  );
}

export default ArchiveItem;
