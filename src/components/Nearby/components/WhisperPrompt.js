import React, { useState } from "react";

function WhisperPrompt() {
  const [whisper, setWhisper] = useState("");

  const handleSubmit = () => {
    if (whisper.trim() === "") return;
    // 🔮 Save to Firestore later
    console.log("Whisper:", whisper);
    setWhisper("");
  };

  return (
    <div className="bg-purple-100 p-4 rounded mb-4">
      <p className="font-semibold text-purple-700">🌬 Whisper to the map:</p>
      <textarea
        value={whisper}
        onChange={(e) => setWhisper(e.target.value)}
        rows="2"
        className="w-full p-2 mt-2 rounded border border-purple-300"
        placeholder="Type your feeling tied to this place..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Send Whisper
      </button>
    </div>
  );
}

export default WhisperPrompt;
