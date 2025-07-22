// src/components/Vault/components/VaultEntryBox.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function VaultEntryBox({ onSave }) {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("Light");
  const [unlockAt, setUnlockAt] = useState(new Date());

  const handleSave = () => {
    if (!content.trim()) return;

    const entry = {
      id: Date.now(),
      content,
      emotion,
      createdAt: new Date().toISOString(),
      unlockAt: unlockAt.toISOString(),
      savedBy: "Soulkeeper AI",
    };

    onSave(entry);
    setContent("");
    setEmotion("Light");
    setUnlockAt(new Date());
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 mb-6">
      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Pour your soul into this vault..."
        className="w-full p-3 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm sm:text-base"
        rows={4}
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">

        {/* Emotion Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto">
          {["Light", "Shadow", "Truth"].map((m) => (
            <button
              key={m}
              onClick={() => setEmotion(m)}
              className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap transition ${
                emotion === m
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Date Picker */}
        <div className="flex items-center text-sm flex-wrap gap-2">
          <label className="text-gray-500 dark:text-gray-300">🔓 Unlock at:</label>
          <DatePicker
            selected={unlockAt}
            onChange={(date) => setUnlockAt(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            className="bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white px-2 py-1 rounded text-sm"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}

export default VaultEntryBox;
