import React from "react";

function StoryReel() {
  return (
    <div className="flex space-x-3 overflow-x-auto py-4">
      {/* Placeholder story rings */}
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="w-16 h-16 rounded-full border-4 border-pink-500 flex-shrink-0"
        >
          {/* Future: User avatar inside */}
        </div>
      ))}
    </div>
  );
}

export default StoryReel;
