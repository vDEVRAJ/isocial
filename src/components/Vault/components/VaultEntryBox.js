import React, { useState } from "react";

const emotionOptions = ["🌞 Light", "🌑 Shadow", "🧿 Truth"];

function VaultEntryBox({ onSave }) {
  const [entry, setEntry] = useState("");
  const [emotion, setEmotion] = useState("🧿 Truth");

  const handleSave = () => {
    if (entry.trim() === "") return;
    onSave({ content: entry, emotion, timestamp: new Date().toISOString() });
    setEntry("");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows="4"
        className="w-full p-2 border rounded"
        placeholder="Write your truth here..."
      />
      <div className="flex items-center justify-between mt-2">
        <select
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {emotionOptions.map((emo) => (
            <option key={emo} value={emo}>
              {emo}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}

export default VaultEntryBox;
