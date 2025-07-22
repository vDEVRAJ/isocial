// src/components/Shouts/components/ShoutCard.js
import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import {
  FaHeart,
  FaComment,
  FaUserPlus,
  FaShare,
  FaQuoteRight,
  FaEllipsisV,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommentBox from "./CommentBox";

function ShoutCard({ shout, inlineEcho = false, forceEchoOpen = false }) {
  const navigate = useNavigate();
  const {
    id = "mock-id",
    user = "Lisa Kio",
    avatar = "https://i.pravatar.cc/150?img=47",
    text = "This is a powerful moment of reflection. You are reading a mock shout!",
    timestamp = new Date().toISOString(),
    likes = 12,
    comments = 3,
    views = 105,
  } = shout;

  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(forceEchoOpen);
  const isLong = text.split(" ").length > 30;

  // ⏩ Auto-open comments if forced (thread view)
  useEffect(() => {
    if (forceEchoOpen) {
      setShowComments(true);
    }
  }, [forceEchoOpen]);

  const handleCommentClick = () => {
    if (inlineEcho && !forceEchoOpen) {
      setShowComments(!showComments);
    } else {
      navigate(`/shout/${id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-4 shadow-md space-y-4 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{user}</div>
            <div className="text-xs text-gray-500 dark:text-zinc-400">
              {format(timestamp)}
            </div>
          </div>
        </div>
        <FaEllipsisV className="text-gray-400 dark:text-zinc-400 cursor-pointer" />
      </div>

      {/* Shout Text */}
      <div className="text-md leading-relaxed whitespace-pre-line">
        <p className={expanded ? "" : "line-clamp-4"}>{text}</p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-purple-500 hover:underline mt-1"
          >
            {expanded ? "See less" : "See more..."}
          </button>
        )}
      </div>

      {/* Reaction Row */}
      <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 text-sm pt-2">
        {/* Left side */}
        <div className="flex space-x-6">
          <div className="flex items-center gap-1">
            <FaHeart className="text-red-500" /> {likes}
          </div>
          <div
            className={`flex items-center gap-1 ${
              forceEchoOpen ? "text-purple-500" : "cursor-pointer hover:text-purple-500"
            }`}
            onClick={handleCommentClick}
          >
            <FaComment /> {comments}
          </div>
          <div className="flex items-center gap-1">
            <FaUserPlus /> <span className="text-sm">Follow</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex space-x-4 items-center">
          <FaShare className="cursor-pointer" />
          <FaQuoteRight className="cursor-pointer" />
          <div className="flex items-center gap-1">
            <span role="img" aria-label="views">👁️</span> {views}
          </div>
        </div>
      </div>

      {/* 💬 Echo Chamber */}
      {inlineEcho && showComments && (
        <div className="pt-2">
          <CommentBox shoutId={id} />
        </div>
      )}
    </div>
  );
}

export default ShoutCard;
