import React, { useState } from "react";
import CapsuleComposer from "./components/CapsuleComposer";
import CapsuleCard from "./components/CapsuleCard";

function TimeCapsules() {
  const [capsules, setCapsules] = useState([]);

  const handleCreate = (capsule) => {
    setCapsules((prev) => [capsule, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">⏳ Time Capsules</h1>
      <p className="text-gray-600 mb-4">
        Write a message or memory to your future self. It will unlock at the time you choose.
      </p>
      <CapsuleComposer onCreate={handleCreate} />
      <div className="space-y-4">
        {capsules.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
}

export default TimeCapsules;
