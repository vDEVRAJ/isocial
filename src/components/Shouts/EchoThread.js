// src/components/Shouts/EchoThread.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ShoutCard from "./components/ShoutCard";
import CommentBox from "./components/CommentBox";

function EchoThread() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🧪 Temporary mock shout (replace with real fetch later)
  const mockShout = {
    id,
    user: "Lisa Kio",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "This is a powerful moment of reflection. You are reading a mock shout!",
    timestamp: new Date().toISOString(),
    likes: 17,
    comments: 9,
    views: 211,
  };

  // 💬 Local state for comments (initially empty)
  const [comments, setComments] = useState([]);

  // 📥 Append new comment to the list
  const handleNewComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 🔙 Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-500 hover:underline mb-4"
      >
        <FaArrowLeft /> Back
      </button>

      {/* 🗣️ Shout */}
      <ShoutCard shout={mockShout} inlineEcho={false} />

      {/* 💬 Echo Chamber */}
      <div className="mt-6">
        <CommentBox
          shoutId={id}
          initialComments={comments}
          onNewComment={handleNewComment}
        />
      </div>
    </div>
  );
}

export default EchoThread;
