import React from "react";
import StoryReel from "./StoryReel";
import PostCard from "./PostCard";
import DailyChallenge from "./DailyChallenge";
import ShoutPrompt from "./ShoutPrompt";

function Home() {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <StoryReel />
      <ShoutPrompt />
      <DailyChallenge />
      
      {/* Example posts (mock data for now) */}
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
