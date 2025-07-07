import React, { useState } from "react";
import EmotionSorter from "./components/EmotionSorter";
import FeedItem from "./components/FeedItem";

function SoulFeed() {
  const [filter, setFilter] = useState("All");

  const mockFeed = [
    { id: 1, type: "Shout", content: "I miss who I used to be.", emotion: "Shadow" },
    { id: 2, type: "Time Capsule", content: "Dear future me, please forgive.", emotion: "Truth" },
    { id: 3, type: "Story", content: "I danced under moonlight today 🌙", emotion: "Light" },
    { id: 4, type: "Ka Reflection", content: "Silence is not absence — it's presence without noise.", emotion: "Truth" },
  ];

  const filteredFeed = mockFeed.filter(
    (item) => filter === "All" || item.emotion === filter
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🌀 Soul Feed</h1>
      <p className="text-gray-600 mb-4">
        Scroll through the collective soul. Choose what feeling you wish to witness.
      </p>
      <EmotionSorter selected={filter} onSelect={setFilter} />
      <div className="space-y-4">
        {filteredFeed.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SoulFeed;
