import React from "react";

function TagFilter({ selected, onSelect }) {
  const filters = ["All", "Vault", "Ka", "Capsule", "Light", "Shadow", "Truth"];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`px-3 py-1 text-sm rounded-full border ${
            selected === tag
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;
