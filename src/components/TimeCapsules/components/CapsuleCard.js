import React from "react";

function CapsuleCard({ capsule }) {
  const now = new Date();
  const unlockTime = new Date(capsule.unlockTime);
  const isUnlocked = now >= unlockTime;

  return (
    <div className="bg-white p-4 rounded shadow mb-4 border-l-4 border-indigo-500">
      {isUnlocked ? (
        <>
          <p className="text-gray-800 whitespace-pre-wrap mb-2">
            {capsule.message}
          </p>
          <p className="text-xs text-green-600">✅ Unlocked</p>
        </>
      ) : (
        <>
          <p className="text-gray-400 italic mb-2">
            🔒 This capsule will unlock on:{" "}
            <span className="font-medium">
              {unlockTime.toLocaleDateString()} {unlockTime.toLocaleTimeString()}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Until then… your truth waits.
          </p>
        </>
      )}
    </div>
  );
}

export default CapsuleCard;
