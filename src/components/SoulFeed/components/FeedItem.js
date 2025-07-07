import React from "react";

function FeedItem({ item }) {
  const emotionColors = {
    Light: "bg-green-100 border-green-400 text-green-700",
    Shadow: "bg-gray-100 border-gray-400 text-gray-700",
    Truth: "bg-blue-100 border-blue-400 text-blue-700",
  };

  const emotionClass = emotionColors[item.emotion] || "bg-white";

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded shadow-sm ${emotionClass}`}
    >
      <div className="text-xs text-gray-500 mb-1">
        {item.type} • {item.emotion}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap">{item.content}</p>
    </div>
  );
}

export default FeedItem;
