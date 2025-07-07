import React, { useState } from "react";

function CapsuleComposer({ onCreate }) {
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState("1d");

  const handleSubmit = () => {
    if (!message) return;

    const now = new Date();
    let unlockDate = new Date(now);

    if (delay === "1d") unlockDate.setDate(now.getDate() + 1);
    if (delay === "1w") unlockDate.setDate(now.getDate() + 7);
    if (delay === "1m") unlockDate.setMonth(now.getMonth() + 1);
    if (delay === "1y") unlockDate.setFullYear(now.getFullYear() + 1);

    const capsule = {
      id: Date.now(),
      message,
      unlockTime: unlockDate.toISOString(),
    };

    onCreate(capsule);
    setMessage("");
    setDelay("1d");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message to your future self..."
        rows="3"
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="1d">Unlock in 1 day</option>
        <option value="1w">Unlock in 1 week</option>
        <option value="1m">Unlock in 1 month</option>
        <option value="1y">Unlock in 1 year</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
      >
        Save Capsule
      </button>
    </div>
  );
}

export default CapsuleComposer;
