import React from "react";

function PublicPost({ post }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mb-4">
      <p className="text-gray-800 mb-2 whitespace-pre-wrap">{post.content}</p>
      <div className="text-xs text-gray-400 flex justify-between">
        <span>{post.type}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default PublicPost;
