import React, { useState } from "react";

function StoryUploader({ onPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    if (!text && !image) return;

    const story = {
      id: Date.now(),
      text,
      image: image ? URL.createObjectURL(image) : null,
      timestamp: new Date().toISOString(),
    };

    onPost(story);
    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a short story..."
        rows="3"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
      >
        Post Story
      </button>
    </div>
  );
}

export default StoryUploader;
