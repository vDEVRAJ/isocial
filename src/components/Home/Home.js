import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSun, FaMoon, FaPlus } from "react-icons/fa";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import StoryComposer from "./components/StoryComposer";
import StoryReel from "./components/StoryReel";
import PostCard from "./components/PostCard";
import PostComposer from "./components/PostComposer";

function Home({ toggleTheme }) {
  const navigate = useNavigate();
  const isDark = document.documentElement.classList.contains("dark");

  const [showComposer, setShowComposer] = useState(false);
  const [showStoryComposer, setShowStoryComposer] = useState(false);
  const [showFAB, setShowFAB] = useState(true);
  const [posts, setPosts] = useState([]);
  const lastScrollY = useRef(0);

  // 🌐 Listen to posts in real-time
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPosts = snapshot.docs.map((doc) => ({
        postId: doc.id,
        ...doc.data(),
      }));
      setPosts(allPosts);
    });

    return () => unsubscribe();
  }, []);

  // ⬆️⬇️ Hide FAB on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowFAB(currentY <= lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧪 Add test comment (run only once — remove after testing)
  useEffect(() => {
    // 👇 Replace with your real post ID
    const testPostId = "1IiVuAgibQctiTED1ie";
    addTestComment(testPostId);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/nearby"),
    onSwipedRight: () => navigate("/shouts"),
    delta: 50,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      {...handlers}
      className={`min-h-screen w-full ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } pb-24 transition-colors duration-300 relative`}
    >
      {/* 🧭 Top Navbar */}
      <div
        className={`sticky top-0 z-50 flex justify-between items-center px-4 py-3 border-b ${
          isDark ? "bg-black border-zinc-700" : "bg-white border-zinc-300"
        }`}
      >
        <h1 className="text-lg font-bold text-purple-500">iSocial 🧿</h1>
        <div className="flex items-center gap-4 text-xl">
          <button onClick={() => navigate("/notifications")}>
            <FaBell className="hover:text-purple-400" />
          </button>
          <button onClick={toggleTheme}>
            {isDark ? (
              <FaSun className="text-yellow-300 hover:text-yellow-400" />
            ) : (
              <FaMoon className="text-purple-600 hover:text-purple-700" />
            )}
          </button>
        </div>
      </div>

      {/* 🎞️ Stories */}
      <div className="pt-4 px-4 relative">
        <StoryReel onAddStory={() => setShowStoryComposer(true)} />
      </div>

      {/* 🖼️ Posts */}
      <div className="mt-6 flex flex-col gap-6 px-4">
        {posts.map((post) => (
          <PostCard
            key={post.postId}
            image={post.image}
            caption={post.caption}
            postId={post.postId}
            userInfo={post.userInfo}
            timestamp={post.timestamp?.toDate()}
          />
        ))}
      </div>

      {/* ➕ FAB for Post Composer */}
      <button
        onClick={() => setShowComposer(true)}
        className={`fixed bottom-24 right-5 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
          showFAB ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <FaPlus className="text-xl" />
      </button>

      {/* 🧵 Post Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowComposer(false)}
              className="absolute top-2 right-3 text-xl text-zinc-400 hover:text-red-400"
            >
              ✕
            </button>
            <PostComposer />
          </div>
        </div>
      )}

      {/* 🌈 Story Composer Modal */}
      {showStoryComposer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowStoryComposer(false)}
              className="absolute top-2 right-3 text-xl text-zinc-400 hover:text-red-400"
            >
              ✕
            </button>
            <StoryComposer onClose={() => setShowStoryComposer(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

// 🧪 Test helper function (bottom of file)
async function addTestComment(postId) {
  const commentRef = collection(db, "posts", postId, "comments");

  try {
    await addDoc(commentRef, {
      text: "This is a test comment from VS Code",
      timestamp: serverTimestamp(),
      user: {
        name: "Test User",
        uid: "test123",
        photoURL: "",
      },
    });
    console.log("✅ Test comment added to post:", postId);
  } catch (error) {
    console.error("❌ Failed to add comment:", error);
  }
}
