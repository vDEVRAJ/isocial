import React from "react";
import SoulTagGenerator from "./components/SoulTagGenerator";
import TagDisplay from "./components/TagDisplay";

function SoulTags() {
  // Mock emotional data — in future will come from Firestore
  const mockData = [
    { emotion: "🌞 Light" },
    { emotion: "🌞 Light" },
    { emotion: "🧿 Truth" },
    { emotion: "🧿 Truth" },
    { emotion: "🌑 Shadow" },
    { emotion: "🌑 Shadow" },
    { emotion: "🌑 Shadow" },
  ];

  const tags = SoulTagGenerator(mockData);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🔖 Soul Tags</h1>
      <p className="text-gray-600">
        These tags represent your emotional footprint — based on how you feel, reflect, and whisper.
      </p>
      <TagDisplay tags={tags} />
    </div>
  );
}

export default SoulTags;
