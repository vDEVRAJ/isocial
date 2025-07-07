import React, { useState } from "react";

function KaChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded resize-none"
        rows="3"
        placeholder="Ask Ka anything your soul is holding..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Reflect with Ka
      </button>
    </div>
  );
}

export default KaChatBox;
