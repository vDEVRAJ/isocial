import React, { useState } from "react";
import StoryUploader from "./components/StoryUploader";
import StoryRing from "./components/StoryRing";
import StoryViewer from "./components/StoryViewer";

function Stories() {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);

  const handlePost = (story) => {
    setStories((prev) => [story, ...prev]);
  };

  const handleOpen = (story) => {
    setActiveStory(story);
  };

  const handleClose = () => {
    setActiveStory(null);
  };

  const now = new Date();
  const validStories = stories.filter((s) => {
    const created = new Date(s.timestamp);
    const diff = now - created;
    return diff < 24 * 60 * 60 * 1000; // 24 hours in ms
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">📖 Storyteller’s Ring</h1>
      <StoryUploader onPost={handlePost} />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {validStories.map((story) => (
          <StoryRing key={story.id} story={story} onOpen={handleOpen} />
        ))}
      </div>
      <StoryViewer story={activeStory} onClose={handleClose} />
    </div>
  );
}

export default Stories;
