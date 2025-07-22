// src/components/Home/components/StoryComposer.js
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { db, storage } from "../../../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { toast } from "react-toastify";

function StoryComposer({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!imageFile || !caption.trim()) {
      return toast.error("Please select an image and write a caption.");
    }

    setLoading(true);
    try {
      const storageRef = ref(storage, `stories/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "stories"), {
        imageUrl,
        caption,
        createdAt: serverTimestamp(),
      });

      toast.success("🌟 Story shared!");
      setImageFile(null);
      setImagePreview(null);
      setCaption("");

      // ✅ Close the modal after success
      if (onClose) onClose();

    } catch (err) {
      console.error(err);
      toast.error("Failed to post story.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md space-y-4">
      <label className="flex items-center gap-2 cursor-pointer text-sm text-purple-600 dark:text-purple-400 font-semibold">
        <FaUpload />
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={2}
        placeholder="Write a short caption..."
        className="w-full p-2 text-sm rounded-md bg-zinc-100 dark:bg-zinc-800 focus:outline-none"
      />

      <button
        onClick={handlePost}
        disabled={loading}
        className={`w-full py-2 rounded-md text-white transition ${
          loading
            ? "bg-zinc-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Posting..." : "Share to Story"}
      </button>
    </div>
  );
}

export default StoryComposer;
