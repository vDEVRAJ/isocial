import React, { useState } from "react";

function ShoutComposer() {
  const [shout, setShout] = useState("");

  const handlePost = () => {
    if (shout.trim() === "") return;
    // 🔮 Later: Save to Firestore
    console.log("Shouting:", shout);
    setShout("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <textarea
        className="w-full border border-gray-300 p-2 rounded resize-none"
        rows="3"
        placeholder="Speak your truth..."
        value={shout}
        onChange={(e) => setShout(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Shout
      </button>
    </div>
  );
}

export default ShoutComposer;
