// src/components/SoulProfiles/components/ProfileTextFeed.js
import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import ShoutCard from "../../Shouts/components/ShoutCard"; // Adjust if nested

function ProfileTextFeed({ profileUid }) {
  const [shouts, setShouts] = useState([]);

  useEffect(() => {
    const fetchShouts = async () => {
      const q = query(
        collection(db, "shouts"),
        where("userId", "==", profileUid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setShouts(data);
    };

    if (profileUid) fetchShouts();
  }, [profileUid]);

  if (!shouts.length) return <p className="text-center text-zinc-500">No shouts yet.</p>;

  return (
    <div className="space-y-4">
      {shouts.map((shout) => (
        <ShoutCard key={shout.id} shout={shout} />
      ))}
    </div>
  );
}

export default ProfileTextFeed;
