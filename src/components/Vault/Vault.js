import React, { useState } from "react";
import VaultEntryBox from "./components/VaultEntryBox";
import VaultEntryCard from "./components/VaultEntryCard";
import EmotionFilter from "./components/EmotionFilter";

function Vault() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleSave = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const filteredEntries =
    filter === "All"
      ? entries
      : entries.filter((e) => e.emotion === filter);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🗝 Hridaya Vault</h1>
      <VaultEntryBox onSave={handleSave} />
      <EmotionFilter active={filter} onChange={setFilter} />
      <div>
        {filteredEntries.length === 0 ? (
          <p className="text-gray-500 italic">No entries yet...</p>
        ) : (
          filteredEntries.map((entry, idx) => (
            <VaultEntryCard key={idx} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}

export default Vault;
