// src/components/SoulProfiles/components/ProfileStoryFeed.js
import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import StoryCard from "../../Stories/components/StoryCard"; // Adjust if needed

function ProfileStoryFeed({ profileUid }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const q = query(
        collection(db, "stories"),
        where("userId", "==", profileUid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStories(data);
    };

    if (profileUid) fetchStories();
  }, [profileUid]);

  if (!stories.length) return <p className="text-center text-zinc-500">No stories yet.</p>;

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}

export default ProfileStoryFeed;
