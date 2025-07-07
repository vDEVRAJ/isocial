import React from "react";

function TagDisplay({ tags = [] }) {
  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-3 py-1 rounded-full shadow text-sm animate-pulse"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagDisplay;
