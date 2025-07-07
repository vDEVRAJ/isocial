import React, { useState } from "react";

function ShoutCard({ username = "Anonymous", content = "This is a raw shout.", soulVotes = 0, shadowVotes = 0 }) {
  const [soul, setSoul] = useState(soulVotes);
  const [shadow, setShadow] = useState(shadowVotes);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold">{username}</h3>
        <span className="text-sm text-gray-500">🗓️ just now</span>
      </div>
      <p className="mb-3 text-gray-800">{content}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => setSoul(soul + 1)}
          className="text-green-600 font-medium hover:underline"
        >
          🟢 Soul ({soul})
        </button>
        <button
          onClick={() => setShadow(shadow + 1)}
          className="text-red-500 font-medium hover:underline"
        >
          🔴 Shadow ({shadow})
        </button>
      </div>
    </div>
  );
}

export default ShoutCard;
