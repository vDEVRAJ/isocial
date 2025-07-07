import React from "react";

function PostCard({ username = "Anonymous", content = "This is a truth post.", timestamp = "just now" }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{username}</h2>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-800">{content}</p>
    </div>
  );
}

export default PostCard;
