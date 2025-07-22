// src/components/SoulProfiles/components/ProfileHeader.js

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify";

function ProfileHeader({ name = "Devraj", xp = 0, photoURL, profileUid }) {
  const [user] = useAuthState(auth);
  const [bio, setBio] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwner = user?.uid === profileUid;

  // 🧠 Get Level + Aura
  let level = "🌱 Wanderer";
  let bgGradient = "from-sky-400 via-indigo-500 to-purple-600";
  let glow = "shadow-[0_0_10px_3px_rgba(99,102,241,0.6)]";

  if (xp >= 1000) {
    level = "🌌 Sage";
    bgGradient = "from-indigo-500 via-violet-700 to-purple-900";
    glow = "shadow-[0_0_15px_4px_rgba(168,85,247,0.8)]";
  } else if (xp >= 600) {
    level = "🌠 Witness";
    bgGradient = "from-purple-500 via-pink-600 to-rose-500";
    glow = "shadow-[0_0_14px_3px_rgba(244,114,182,0.7)]";
  } else if (xp >= 300) {
    level = "✨ Whisperer";
    bgGradient = "from-pink-500 via-red-400 to-amber-500";
    glow = "shadow-[0_0_14px_2px_rgba(251,191,36,0.6)]";
  } else if (xp >= 100) {
    level = "🌿 Seeker";
    bgGradient = "from-emerald-400 via-teal-500 to-cyan-500";
    glow = "shadow-[0_0_12px_2px_rgba(34,211,238,0.5)]";
  }

  // 🔍 Load profile data (bio, followers, following)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileUid) return;
      try {
        const ref = doc(db, "users", profileUid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setBio(data.bio || "");
          setFollowers(data.followers || []);
          setFollowing(data.following || []);
          setIsFollowing(user && data.followers?.includes(user.uid));
        }
      } catch (err) {
        console.error("🔥 Failed to load profile data:", err);
      }
    };
    fetchProfile();
  }, [profileUid, user]);

  // 🔁 Follow / Unfollow
  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("Please log in to follow.");
      return;
    }

    try {
      const profileRef = doc(db, "users", profileUid);
      const currentUserRef = doc(db, "users", user.uid);

      if (isFollowing) {
        await updateDoc(profileRef, {
          followers: arrayRemove(user.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(profileUid),
        });
        setFollowers((prev) => prev.filter((id) => id !== user.uid));
        setIsFollowing(false);
      } else {
        await updateDoc(profileRef, {
          followers: arrayUnion(user.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayUnion(profileUid),
        });
        setFollowers((prev) => [...prev, user.uid]);
        setIsFollowing(true);
      }
    } catch (err) {
      toast.error("Failed to update follow status.");
      console.error("Follow error:", err);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl mb-6 bg-gradient-to-br ${bgGradient} p-6 text-white shadow-xl`}
    >
      {/* 🌕 Profile Picture */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-black">
        <img
          src={photoURL || "https://i.pravatar.cc/150?img=50"}
          alt="Profile"
          className={`w-full h-full object-cover rounded-full ${glow}`}
        />
      </div>

      {/* 🧠 Soul Info */}
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm text-zinc-200 mt-1">
          {level} • XP: {xp}
        </p>

        {bio && (
          <p className="mt-2 text-sm italic text-white/80 max-w-md">{bio}</p>
        )}

        <div className="mt-3 text-xs text-white/90 space-x-4">
          <span>👥 {followers.length} Followers</span>
          <span>🧭 {following.length} Following</span>
        </div>

        {/* 🔘 Follow Button */}
        {!isOwner && (
          <button
            onClick={handleFollowToggle}
            className={`mt-3 px-4 py-1 rounded-full text-xs font-medium transition ${
              isFollowing
                ? "bg-zinc-200 text-black hover:bg-zinc-300"
                : "bg-white text-purple-700 hover:bg-purple-100"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
