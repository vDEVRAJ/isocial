// src/components/Home/components/PostCard.js
import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
} from "react-icons/fa";
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "timeago.js";
import CommentModal from "./CommentModal";

const PostCard = ({ image, caption, postId, userInfo, timestamp }) => {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!postId) return;
    const likesRef = collection(db, "posts", postId, "likes");

    const unsubscribe = onSnapshot(likesRef, (snapshot) => {
      setLikesCount(snapshot.size);
      if (user) {
        setLiked(snapshot.docs.some((doc) => doc.id === user.uid));
      }
    });

    return () => unsubscribe();
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) return;
    const likeRef = doc(db, "posts", postId, "likes", user.uid);

    if (liked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        userId: user.uid,
        likedAt: new Date(),
      });
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-md bg-white/80 dark:bg-black/50 backdrop-blur-lg p-4 mb-4">
        <img src={image} alt="Post" className="rounded-xl w-full object-cover" />

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>
            <span>{likesCount}</span>

            <button onClick={() => setShowCommentModal(true)}>
              <FaRegCommentDots />
            </button>
          </div>
          <div className="text-xs text-gray-500">
            {timestamp?.toDate && format(timestamp.toDate())}
          </div>
        </div>

        <p className="mt-2">{caption}</p>
      </div>

      {showCommentModal && (
        <CommentModal
          postId={postId}
          user={user}
          onClose={() => setShowCommentModal(false)}
        />
      )}
    </>
  );
};

export default PostCard;
