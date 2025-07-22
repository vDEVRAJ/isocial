import React from "react";

function SortToggle() {
  return (
    <select className="bg-white dark:bg-gray-800 border px-3 py-1 rounded text-sm">
      <option value="recent">🕐 Recent</option>
      <option value="soul">💚 Soulful</option>
      <option value="shadow">🖤 Shadowed</option>
    </select>
  );
}

export default SortToggle;
