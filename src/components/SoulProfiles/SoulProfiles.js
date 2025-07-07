import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import PublicPost from "./components/PublicPost";

function SoulProfiles() {
  const [isPublic, setIsPublic] = useState(true);

  const publicPosts = [
    {
      id: 1,
      type: "Shout",
      content: "I broke the silence today. And it healed someone.",
      date: "2025-06-01",
    },
    {
      id: 2,
      type: "Capsule",
      content: "This message is for my future self: I forgive you.",
      date: "2025-06-25",
    },
  ];

  const soulTags = ["Peace Whisperer", "Shadow Tender"];
  const kaQuote = "Even the silence has roots in your soul.";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProfileHeader name="Devraj" xp={275} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Soul Tags</h2>
        <button
          onClick={() => setIsPublic(!isPublic)}
          className="text-sm text-indigo-600 underline"
        >
          {isPublic ? "Make Private" : "Make Public"}
        </button>
      </div>

      {isPublic ? (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {soulTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">🧘‍♂️ Ka Quote</h2>
            <blockquote className="text-gray-600 italic border-l-4 pl-3 border-indigo-300">
              “{kaQuote}”
            </blockquote>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">📣 Public Posts</h2>
            {publicPosts.map((post) => (
              <PublicPost key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic">
          This soul space is private.
        </p>
      )}
    </div>
  );
}

export default SoulProfiles;
