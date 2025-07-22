// src/components/SoulProfiles/components/ProfilePostsFeed.js
import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import VaultEntryCard from "../../Vault/components/VaultEntryCard";

function ProfilePostsFeed({ profileUid }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchVaultEntries = async () => {
      const q = query(
        collection(db, "vaultEntries"),
        where("userId", "==", profileUid),
        where("unlocked", "==", true),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(entries);
    };

    if (profileUid) fetchVaultEntries();
  }, [profileUid]);

  if (!posts.length) return <p className="text-center text-zinc-500">No posts yet.</p>;

  return (
    <div className="space-y-4">
      {posts.map((entry) => (
        <VaultEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default ProfilePostsFeed;
