// src/components/Vault/Vault.js
import React, { useEffect, useState, useRef } from "react";
import VaultEntryBox from "./components/VaultEntryBox";
import VaultEntryCard from "./components/VaultEntryCard";
import { db } from "../../app/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";

function Vault() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);

  // ✅ Real-time sync from Firestore
  useEffect(() => {
    const q = query(collection(db, "vaultEntries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEntries = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEntries(liveEntries);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Unlock memory toast (scroll + highlight)
  useEffect(() => {
    const now = Date.now();
    entries.forEach((entry) => {
      const unlockTime = new Date(entry.unlockAt).getTime();
      const isUnlocked = unlockTime <= now;
      const toastShownKey = `vault_toast_shown_${entry.id}`;
      if (isUnlocked && !localStorage.getItem(toastShownKey)) {
        toast.info("🔓 A memory just whispered back to life…", {
          toastId: `unlock-${entry.id}`,
          onClick: () => {
            const element = document.getElementById(`vault-entry-${entry.id}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              element.classList.add("ring-4", "ring-purple-500");
              setTimeout(() => {
                element.classList.remove("ring-4", "ring-purple-500");
              }, 3000);
            }
          },
        });
        localStorage.setItem(toastShownKey, "true");
      }
    });
  }, [entries]);

  const handleSave = async (entry) => {
    try {
      await addDoc(collection(db, "vaultEntries"), entry);
      toast.success("✨ Your soul has been safely preserved", {
        position: "top-center",
        autoClose: 4000,
      });
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast.error("Something went wrong while saving your Vault entry.");
    }
  };

  const filteredEntries =
    filter === "All" ? entries : entries.filter((e) => e.emotion === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6" ref={containerRef}>
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
        🔐 Hridaya Vault
      </h1>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-6 space-x-2 sm:space-x-3">
        {["All", "Light", "Shadow", "Truth"].map((mood) => (
          <button
            key={mood}
            onClick={() => setFilter(mood)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
              filter === mood
                ? "bg-purple-600 text-white ring-2 ring-purple-300"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Vault Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No entries yet... Begin your soul journal.
          </p>
        ) : (
          filteredEntries.map((entry) => (
            <div id={`vault-entry-${entry.id}`} key={entry.id}>
              <VaultEntryCard entry={entry} />
            </div>
          ))
        )}
      </div>

      {/* Composer Box */}
      <div className="mt-10 border-t pt-6">
        <VaultEntryBox onSave={handleSave} />
      </div>
    </div>
  );
}

export default Vault;
