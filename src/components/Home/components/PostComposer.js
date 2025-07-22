// src/components/Home/components/PostComposer.js
import React, { useState, useEffect } from "react";
import { FaImage, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { db, auth } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function PostComposer() {
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const wordLimit = 150;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImageURL("");
    };
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    if (!currentUser) {
      toast.error("⚠️ You must be logged in to post.");
      return;
    }

    if (!preview && !imageURL) {
      toast.error("📷 Please upload an image or paste a URL.");
      return;
    }

    const wordCount = caption.trim().split(/\s+/).length;
    if (wordCount > wordLimit) {
      toast.error(`📝 Caption too long (max ${wordLimit} words).`);
      return;
    }

    const postData = {
      image: preview || imageURL,
      caption: caption.trim(),
      uid: currentUser.uid,
      userInfo: {
        name: currentUser.displayName || "Anonymous",
        photoURL: currentUser.photoURL || "",
      },
      timestamp: serverTimestamp(),
      likes: [],
    };

    try {
      await addDoc(collection(db, "posts"), postData);
      toast.success("✅ Your post has been shared!");
      setCaption("");
      setImageURL("");
      setPreview(null);
    } catch (error) {
      console.error("Post Error:", error);
      toast.error("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
      <div className="flex flex-col gap-3">
        {/* 📷 Upload Image */}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-purple-500 font-medium">
          <FaImage /> Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* 🔗 Image URL Input */}
        <input
          type="url"
          placeholder="Or paste image URL..."
          className="px-3 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm"
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
            setPreview(null);
          }}
        />

        {/* 🔍 Preview Image */}
        {preview || imageURL ? (
          <img
            src={preview || imageURL}
            alt="Preview"
            className="rounded-lg max-h-64 object-cover border border-zinc-200 dark:border-zinc-700"
          />
        ) : null}

        {/* ✏️ Caption Box */}
        <textarea
          rows={2}
          placeholder={`Write a caption (max ${wordLimit} words)...`}
          className="px-3 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-sm resize-none"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* 📤 Submit Button */}
        <button
          onClick={handlePost}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition"
        >
          <FaCloudUploadAlt /> Post
        </button>
      </div>
    </div>
  );
}

export default PostComposer;
