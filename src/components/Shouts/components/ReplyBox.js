import React, { useState } from "react";

function ReplyBox() {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const handleReply = () => {
    if (reply.trim() === "") return;
    setReplies([...replies, reply]);
    setReply("");
  };

  return (
    <div className="bg-white border-t mt-4 pt-2">
      <textarea
        className="w-full border border-gray-300 rounded p-2 resize-none"
        rows="2"
        placeholder="Leave a soul reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button
        onClick={handleReply}
        className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Reply
      </button>

      <div className="mt-3 space-y-2">
        {replies.map((r, idx) => (
          <div key={idx} className="text-sm bg-gray-100 p-2 rounded">
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReplyBox;
