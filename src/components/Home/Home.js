import React from "react";
import StoryReel from "./components/StoryReel";
import PostCard from "./components/PostCard";
import DailyChallenge from "./components/DailyChallenge";
import ShoutPrompt from "./components/ShoutPrompt";

function Home() {
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-4">
      {/* Top Story Rings */}
      <StoryReel />

      {/* Post Prompt */}
      <ShoutPrompt />

      {/* Daily Challenge Prompt */}
      <DailyChallenge />

      {/* Example Post Cards */}
      <PostCard
        username="Devraj 🔱"
        content="Sometimes silence is louder than shouting."
        timestamp="2 min ago"
      />
      <PostCard
        username="SageSeeker"
        content="The hardest truth is the one you tell yourself."
        timestamp="10 min ago"
      />
    </div>
  );
}

export default Home;
