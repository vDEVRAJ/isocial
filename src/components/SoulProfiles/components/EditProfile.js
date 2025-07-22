// src/components/SoulProfiles/components/EditProfile.js

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

function EditProfile({ onCancel, onSaveSuccess }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const storage = getStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setBio(data.bio || "");
        }
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      let photoURL = user.photoURL || "";

      if (photo) {
        const photoRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      const updateData = {
        name: name.trim(),
        bio: bio.trim(),
        photoURL,
      };

      await updateDoc(doc(db, "users", user.uid), updateData);

      toast.success("✨ Profile updated!");

      // 🔁 Let parent update profile and exit edit mode
      if (onSaveSuccess) onSaveSuccess(updateData);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400 dark:text-zinc-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-6 text-center">✏️ Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded border bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-sm"
        />
        <textarea
          value={bio}
          placeholder="Tell the world your soul story..."
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded border bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-sm"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="text-sm"
        />

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-black dark:text-white py-2 rounded text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
