import React from "react";

function StoryRing({ story, onOpen }) {
  return (
    <div
      className="cursor-pointer flex flex-col items-center"
      onClick={() => onOpen(story)}
    >
      <div className="w-16 h-16 rounded-full border-4 border-indigo-500 p-1 hover:scale-105 transition-all duration-200">
        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
          {story.image ? (
            <img
              src={story.image}
              alt="story"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
              ✍️
            </div>
          )}
        </div>
      </div>
      <span className="text-xs mt-1 text-gray-500">Story</span>
    </div>
  );
}

export default StoryRing;
