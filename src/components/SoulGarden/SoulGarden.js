import React, { useState } from "react";
import PlantComposer from "./components/PlantComposer";
import SeedCard from "./components/SeedCard";

function SoulGarden() {
  const [seeds, setSeeds] = useState([
    {
      id: 1,
      title: "Forgive Myself",
      message: "I release the guilt I’ve carried alone.",
      level: 2,
    },
    {
      id: 2,
      title: "Grandma’s Smile",
      message: "May her laughter echo through my dreams.",
      level: 1,
    },
  ]);

  const handlePlant = (newSeed) => {
    setSeeds([newSeed, ...seeds]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">🌱 Soul Garden</h1>
      <p className="text-gray-600 mb-4">
        Plant your memories, dreams, and prayers. Watch them grow with you.
      </p>

      <PlantComposer onPlant={handlePlant} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {seeds.map((seed) => (
          <SeedCard key={seed.id} seed={seed} />
        ))}
      </div>
    </div>
  );
}

export default SoulGarden;
