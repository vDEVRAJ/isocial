import React from "react";

function KaResponse({ message, mode }) {
  if (!message) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow mb-4">
      <p className="text-sm text-gray-500 mb-1">💬 Ka reflects in <strong>{mode}</strong> mode:</p>
      <p className="text-gray-800 whitespace-pre-line">{message}</p>
    </div>
  );
}

export default KaResponse;
