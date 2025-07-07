import React, { useState } from "react";
import ArchiveItem from "./components/ArchiveItem";
import TagFilter from "./components/TagFilter";

function SoulArchive() {
  const [filter, setFilter] = useState("All");

  const mockEntries = [
    {
      id: 1,
      type: "Vault",
      content: "I still carry my childhood silence like a secret language.",
      emotion: "Shadow",
      date: "2024-12-01",
    },
    {
      id: 2,
      type: "Ka",
      content: "The storm in your heart has a name — it’s called awakening.",
      emotion: "Truth",
      date: "2025-01-15",
    },
    {
      id: 3,
      type: "Capsule",
      content: "Dear me, please forgive us for surviving. It wasn’t easy.",
      emotion: "Light",
      date: "2025-03-11",
    },
  ];

  const filteredEntries = mockEntries.filter((entry) => {
    if (filter === "All") return true;
    return entry.type === filter || entry.emotion === filter;
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Soul Archive</h1>
      <p className="text-gray-600 mb-4">
        Every reflection, every whisper of truth — preserved.
      </p>
      <TagFilter selected={filter} onSelect={setFilter} />
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <ArchiveItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default SoulArchive;
