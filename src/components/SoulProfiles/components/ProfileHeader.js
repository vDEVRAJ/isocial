import React from "react";

function ProfileHeader({ name = "Devraj", xp = 275 }) {
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
    <div className="text-center mb-6">
      <div className={`w-24 h-24 mx-auto rounded-full border-4 ${auraColor} mb-2`} />
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-sm text-gray-500">{level} • XP: {xp}</p>
    </div>
  );
}

export default ProfileHeader;
