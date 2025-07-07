import React from "react";
import ShoutComposer from "./components/ShoutComposer";
import ShoutCard from "./components/ShoutCard";
import ReplyBox from "./components/ReplyBox";
import SortToggle from "./components/SortToggle";

function Shouts() {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <SortToggle />
      <ShoutComposer />

      {/* Example shouts */}
      <div className="mb-6">
        <ShoutCard
          username="NightWhisper"
          content="I forgave myself today for something I held for 10 years."
        />
        <ReplyBox />
      </div>

      <div>
        <ShoutCard
          username="LightSeeker"
          content="I don't know who I am without my pain. But I'm learning."
        />
        <ReplyBox />
      </div>
    </div>
  );
}

export default Shouts;
