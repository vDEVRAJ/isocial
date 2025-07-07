import React from "react";

function XPSystem({ xp = 120 }) {
  let level = "Wanderer";
  let auraColor = "border-gray-400";

  if (xp >= 500) {
    level = "Sage";
    auraColor = "border-yellow-500 animate-pulse";
  } else if (xp >= 300) {
    level = "Witness";
    auraColor = "border-green-400";
  } else if (xp >= 150) {
    level = "Whisperer";
    auraColor = "border-sky-400";
  } else if (xp >= 50) {
    level = "Seeker";
    auraColor = "border-indigo-400";
  }

  return (
    <div className="p-6 text-center">
      <div className={`w-24 h-24 mx-auto rounded-full border-4 ${auraColor} mb-4`} />
      <h2 className="text-xl font-bold">{level}</h2>
      <p className="text-sm text-gray-500">XP: {xp}</p>
    </div>
  );
}

export default XPSystem;
