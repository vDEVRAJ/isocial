import React, { useState } from "react";

function SortToggle({ onChange }) {
  const [sortBy, setSortBy] = useState("recent");

  const toggleSort = () => {
    const newSort = sortBy === "recent" ? "soulpower" : "recent";
    setSortBy(newSort);
    if (onChange) onChange(newSort);
  };

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={toggleSort}
        className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Sort by: {sortBy === "recent" ? "🕒 Recent" : "💫 Soulpower"}
      </button>
    </div>
  );
}

export default SortToggle;
