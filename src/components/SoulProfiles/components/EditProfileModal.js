// src/components/SoulProfiles/components/EditProfileModal.js
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";

function EditProfileModal({ profile, onClose, onUpdate }) {
  const [bio, setBio] = useState(profile.bio || "");
  const [kaQuote, setKaQuote] = useState(profile.kaQuote || "");

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", profile.uid);
      await updateDoc(userRef, {
        bio: bio.trim(),
        kaQuote: kaQuote.trim(),
      });
      toast.success("Profile updated successfully ✨");
      onUpdate({ ...profile, bio: bio.trim(), kaQuote: kaQuote.trim() });
      onClose();
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">🛠 Edit Your Soul Profile</h2>

        <label className="text-sm font-medium block mb-1 text-zinc-700 dark:text-zinc-200">Bio</label>
        <textarea
          className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-sm mb-4"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="text-sm font-medium block mb-1 text-zinc-700 dark:text-zinc-200">Ka Quote</label>
        <textarea
          className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-sm mb-4"
          rows={2}
          value={kaQuote}
          onChange={(e) => setKaQuote(e.target.value)}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-sm rounded hover:bg-zinc-400 dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
