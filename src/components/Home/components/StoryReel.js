// src/components/Home/components/StoryReel.js
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { format } from "timeago.js";
import StoryViewer from "./StoryViewer"; // ✅ New Import

function StoryReel() {
  const [stories, setStories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // ✅ Track which story to open

  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(storyData);
    });

    return () => unsubscribe();
  }, []);

  const openStory = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    document.body.style.overflow = ""; // Enable scroll
  };

  return (
    <>
      <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
        {stories.length === 0 ? (
          <p className="text-sm text-zinc-500 italic px-4">No stories yet.</p>
        ) : (
          stories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => openStory(index)} // ✅ Tap to open viewer
              className="min-w-[120px] flex-shrink-0 bg-white dark:bg-zinc-800 rounded-lg shadow p-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={story.imageUrl}
                alt="story"
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                {story.caption || "No caption"}
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">
                {story.createdAt?.toDate ? format(story.createdAt.toDate()) : "just now"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* 📸 Fullscreen Viewer */}
      {selectedIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={selectedIndex}
          onClose={closeViewer}
        />
      )}
    </>
  );
}

export default StoryReel;
