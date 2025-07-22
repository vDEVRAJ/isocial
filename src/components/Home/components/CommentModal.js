import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaPaperPlane,
  FaReply,
  FaTimes,
} from "react-icons/fa";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { format } from "timeago.js";

const CommentModal = ({ postId, onClose, user }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLikesMap, setCommentLikesMap] = useState({});
  const [replyTextMap, setReplyTextMap] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const commentsRef = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const updatedComments = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setComments(updatedComments);

      updatedComments.forEach((comment) => {
        const repliesRef = collection(
          db,
          "posts",
          postId,
          "comments",
          comment.id,
          "replies"
        );

        onSnapshot(repliesRef, (replySnap) => {
          const replies = replySnap.docs.map((r) => ({
            id: r.id,
            ...r.data(),
          }));
          setComments((prev) =>
            prev.map((c) => (c.id === comment.id ? { ...c, replies } : c))
          );
        });

        const likesRef = collection(
          db,
          "posts",
          postId,
          "comments",
          comment.id,
          "likes"
        );

        onSnapshot(likesRef, (likeSnap) => {
          setCommentLikesMap((prev) => ({
            ...prev,
            [comment.id]: {
              count: likeSnap.size,
              liked: user
                ? likeSnap.docs.some((doc) => doc.id === user.uid)
                : false,
            },
          }));
        });
      });
    });

    return () => unsubscribe();
  }, [postId, user]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const words = commentText.trim().split(/\s+/);
    if (words.length > 200) {
      alert("Comments can be a maximum of 200 words.");
      return;
    }

    const commentData = {
      text: commentText.trim(),
      timestamp: serverTimestamp(),
      user: {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
      },
    };

    const commentRef = await addDoc(
      collection(db, "posts", postId, "comments"),
      commentData
    );

    setCommentText("");

    const postDoc = await getDoc(doc(db, "posts", postId));
    if (!postDoc.exists()) return;

    const postOwnerUid = postDoc.data().user?.uid;

    if (postOwnerUid && postOwnerUid !== user.uid) {
      const notificationRef = collection(
        db,
        "users",
        postOwnerUid,
        "notifications"
      );

      await addDoc(notificationRef, {
        type: "comment",
        postId,
        commentId: commentRef.id,
        message: `${user.displayName || "Someone"} commented on your post.`,
        timestamp: serverTimestamp(),
        seen: false,
      });
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) return;
    const likeRef = doc(
      db,
      "posts",
      postId,
      "comments",
      commentId,
      "likes",
      user.uid
    );
    const liked = commentLikesMap[commentId]?.liked;

    if (liked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        userId: user.uid,
        likedAt: serverTimestamp(),
      });
    }
  };

  const handleReply = async (commentId) => {
    const text = replyTextMap[commentId]?.trim();
    if (!text) return;
    const words = text.split(/\s+/);
    if (words.length > 200) {
      alert("Reply can be a maximum of 200 words.");
      return;
    }
    await addDoc(
      collection(db, "posts", postId, "comments", commentId, "replies"),
      {
        text,
        timestamp: serverTimestamp(),
        user: {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          photoURL: user.photoURL || "",
        },
      }
    );
    setReplyTextMap((prev) => ({ ...prev, [commentId]: "" }));
    setReplyingTo(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 w-full h-[75vh] z-50 backdrop-blur-2xl bg-white/95 dark:bg-black/30 border-t border-black/10 dark:border-white/10 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10 dark:border-white/10 text-black dark:text-white font-semibold">
          <span>Comments</span>
          <button onClick={onClose} className="text-black dark:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scroll">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white text-black dark:bg-white/10 p-3 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">
                  {comment.user.name}
                </span>
                <span className="text-xs text-black/60 dark:text-white/50">
                  {comment.timestamp?.toDate &&
                    format(comment.timestamp.toDate())}
                </span>
              </div>
              <p className="mt-1 text-sm">{comment.text}</p>
              <div className="flex space-x-3 items-center mt-2">
                <button onClick={() => handleLikeComment(comment.id)}>
                  {commentLikesMap[comment.id]?.liked ? (
                    <FaHeart className="text-pink-500 text-sm" />
                  ) : (
                    <FaRegHeart className="text-black/50 dark:text-white/50 text-sm" />
                  )}
                </button>
                <span className="text-black/60 dark:text-white/60 text-xs">
                  {commentLikesMap[comment.id]?.count || 0}
                </span>
                <button onClick={() => setReplyingTo(comment.id)}>
                  <FaReply className="text-black/50 dark:text-white/50 text-sm" />
                </button>
              </div>

              {replyingTo === comment.id && (
                <div className="flex items-center mt-2">
                  <input
                    className="flex-1 bg-transparent border-b border-black/30 dark:border-white/30 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 outline-none"
                    placeholder="Write a reply..."
                    value={replyTextMap[comment.id] || ""}
                    onChange={(e) =>
                      setReplyTextMap((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleReply(comment.id)}>
                    <FaPaperPlane className="text-black dark:text-white ml-2" />
                  </button>
                </div>
              )}

              <div className="ml-4 mt-2 space-y-1">
                {comment.replies?.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-black/5 dark:bg-white/5 p-2 rounded-md text-sm text-black dark:text-white"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{reply.user.name}</span>
                      <span className="text-xs text-black/50 dark:text-white/50">
                        {reply.timestamp?.toDate &&
                          format(reply.timestamp.toDate())}
                      </span>
                    </div>
                    <p className="mt-1">{reply.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-black/10 bg-white dark:bg-white/10 backdrop-blur-2xl flex items-center">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-black/50 dark:placeholder-white/50"
          />
          <button onClick={handleAddComment} className="ml-2">
            <FaPaperPlane className="text-black dark:text-white" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentModal;
