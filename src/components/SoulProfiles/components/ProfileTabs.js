// src/components/SoulProfiles/components/ProfileTabs.js
import React from "react";

function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = ["Posts", "Text", "Story"];

  return (
    <div className="flex justify-around border-b dark:border-zinc-700 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 font-medium text-sm border-b-2 transition ${
            activeTab === tab
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-500 dark:text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ProfileTabs;
