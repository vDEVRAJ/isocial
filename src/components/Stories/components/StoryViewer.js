import React from "react";

function StoryViewer({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow max-w-md w-full relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 text-sm"
        >
          ✖
        </button>
        {story.image && (
          <img
            src={story.image}
            alt="story"
            className="w-full max-h-80 object-cover rounded mb-2"
          />
        )}
        {story.text && (
          <p className="text-gray-800 whitespace-pre-wrap">{story.text}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          ⏳ Disappears after 24 hours
        </p>
      </div>
    </div>
  );
}

export default StoryViewer;
