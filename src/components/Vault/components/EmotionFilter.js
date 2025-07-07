import React from "react";

const emotions = ["All", "🌞 Light", "🌑 Shadow", "🧿 Truth"];

function EmotionFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {emotions.map((emo) => (
        <button
          key={emo}
          onClick={() => onChange(emo)}
          className={`px-3 py-1 rounded-full border text-sm ${
            active === emo
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {emo}
        </button>
      ))}
    </div>
  );
}

export default EmotionFilter;
