// src/components/Home/components/StoryViewer.js
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

function StoryViewer({ stories, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1 < stories.length ? prev + 1 : prev));
    }, 5000); // Auto advance every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, stories.length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < stories.length - 1) setCurrentIndex((prev) => prev + 1);
    },
    onSwipedRight: () => {
      if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const story = stories[currentIndex];

  return (
    <div
      {...handlers}
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl bg-zinc-800 p-2 rounded-full hover:bg-red-600 transition"
      >
        <FaTimes />
      </button>

      <img
        src={story.imageUrl}
        alt="story"
        className="max-h-[80vh] max-w-[90vw] object-contain rounded-md shadow-lg"
      />
      <p className="mt-4 text-white text-sm text-center px-6">{story.caption}</p>
    </div>
  );
}

export default StoryViewer;
