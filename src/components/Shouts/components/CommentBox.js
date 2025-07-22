// src/components/Shouts/components/CommentBox.js
import React, { useState } from "react";
import { FaRobot, FaReply, FaHeart } from "react-icons/fa";
import { format } from "timeago.js";

function CommentBox({ shoutId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // ID of the comment being replied to

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      author: "You",
      timestamp: new Date(),
      liked: false,
      likeCount: 0,
      replies: [],
    };

    if (replyTo) {
      // Add as a reply to an existing comment
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo
            ? { ...c, replies: [newComment, ...c.replies] }
            : c
        )
      );
      setReplyTo(null);
    } else {
      // Add as a new top-level comment
      setComments([newComment, ...comments]);
    }

    setComment("");
  };

  const toggleLike = (commentId, isReply = false, parentId = null) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    liked: !reply.liked,
                    likeCount: reply.liked
                      ? reply.likeCount - 1
                      : reply.likeCount + 1,
                  }
                : reply
            ),
          };
        } else if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likeCount: comment.liked
              ? comment.likeCount - 1
              : comment.likeCount + 1,
          };
        } else {
          return comment;
        }
      })
    );
  };

  const renderComments = (commentsList, indent = false, parentId = null) =>
    commentsList.map((c) => (
      <div
        key={c.id}
        className={`mt-2 ${indent ? "ml-6 border-l pl-3 border-purple-400/30" : ""}`}
      >
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/40?u=echo"
            alt="avatar"
            className="w-7 h-7 rounded-full"
          />
          <div className="bg-white dark:bg-zinc-900 rounded-md px-3 py-2 text-sm w-full">
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {c.author}
            </div>
            <div className="text-zinc-700 dark:text-zinc-200">{c.text}</div>
            <div className="flex justify-between items-center text-xs mt-1 text-zinc-400 dark:text-zinc-500">
              <span>{format(c.timestamp)}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLike(c.id, indent, parentId || c.id)}
                  className="flex items-center gap-1"
                >
                  <FaHeart
                    className={`text-sm ${
                      c.liked ? "text-red-500" : "text-zinc-400"
                    }`}
                  />
                  {c.likeCount}
                </button>
                {!indent && (
                  <button
                    onClick={() => setReplyTo(c.id)}
                    className="flex items-center gap-1 text-purple-400 hover:underline"
                  >
                    <FaReply className="text-xs" /> Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🔁 Recursive replies */}
        {c.replies?.length > 0 && renderComments(c.replies, true, c.id)}
      </div>
    ));

  return (
    <div className="mt-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 space-y-3 shadow-inner border border-zinc-300 dark:border-zinc-700">
      {/* 🔮 Composer */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <FaRobot className="text-purple-500" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            replyTo
              ? "↪️ Replying to a thread..."
              : "Whisper a reply into the Echo Chamber..."
          }
          className="flex-1 bg-transparent border-b border-purple-400/30 outline-none text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full"
        >
          Echo
        </button>
      </form>

      {/* 💬 Comments always visible */}
      {comments.length > 0 ? (
        <div>{renderComments(comments)}</div>
      ) : (
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 italic">
          No echoes yet — be the first to speak into the void.
        </p>
      )}
    </div>
  );
}

export default CommentBox;
