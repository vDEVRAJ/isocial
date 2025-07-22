import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaEllipsisV } from "react-icons/fa";
import { auth, db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

import ProfileHeader from "./components/ProfileHeader";
import PublicPost from "./components/PublicPost";
import EditProfile from "./components/EditProfile";

function SoulProfiles() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shoutData, setShoutData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // 🔐 Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Retry up to 10 times to fetch UID from handle
  const fetchHandleWithRetry = async (handle) => {
    for (let i = 0; i < 10; i++) {
      const handleRef = doc(db, "userHandles", handle);
      const handleDoc = await getDoc(handleRef);
      if (handleDoc.exists()) return handleDoc.data().uid;
      await new Promise((res) => setTimeout(res, 300));
    }
    return null;
  };

  // 🧠 Load profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const formattedHandle = handle.trim().toLowerCase();
        const uid = await fetchHandleWithRetry(formattedHandle);

        if (!uid) {
          toast.error("❌ Invalid soul handle.");
          navigate("/");
          return;
        }

        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          toast.error("😢 Profile not found.");
          navigate("/");
          return;
        }

        const userData = userDoc.data();
        setProfile({ uid, ...userData });
      } catch (err) {
        console.error("🔥 Failed to load profile:", err);
        toast.error("⚠️ Unable to load profile.");
        navigate("/");
      }
    };

    fetchProfile();
  }, [handle, navigate]);

  // 📣 Load public posts (shouts)
  useEffect(() => {
    const fetchShouts = async () => {
      if (!Array.isArray(profile?.publicPosts)) return;

      const validPostIds = profile.publicPosts
        .map((p) => (typeof p === "string" ? p : p?.id))
        .filter((id) => typeof id === "string" && id.length > 4);

      const results = await Promise.all(
        validPostIds.map(async (postId) => {
          try {
            const ref = doc(db, "shouts", postId);
            const snap = await getDoc(ref);
            return snap.exists() ? { id: postId, ...snap.data() } : null;
          } catch (err) {
            console.warn("⚠️ Failed to load shout:", postId, err.message);
            return null;
          }
        })
      );

      setShoutData(results.filter(Boolean));
    };

    if (profile) fetchShouts();
  }, [profile]);

  // 📦 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOwner = currentUserId && profile?.uid === currentUserId;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("👋 You’ve logged out.");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("❌ Logout failed.");
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-10 text-zinc-400 dark:text-zinc-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 relative">
      {/* ⋯ Dropdown menu */}
      <div className="absolute top-4 right-4 z-10" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaEllipsisV className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-300" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-md text-sm overflow-hidden">
            {isOwner ? (
              <>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <button className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                  🚫 Block User
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                  ⚠️ Report Profile
                </button>
              </>
            )}
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <button className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              🧘 About Us
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              🆘 Help & Support
            </button>
          </div>
        )}
      </div>

      {/* ✏️ Edit mode or display profile */}
      {editMode ? (
        <EditProfile
          onCancel={() => setEditMode(false)}
          onSaveSuccess={(updatedData) => {
            setProfile((prev) => ({ ...prev, ...updatedData }));
            setEditMode(false);
          }}
        />
      ) : (
        <>
          <ProfileHeader
            name={profile.name || "Anonymous"}
            photoURL={profile.photoURL || ""}
            xp={profile.xp || 0}
            profileUid={profile.uid}
          />

          {profile.bio && (
            <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 italic px-1">
              {profile.bio}
            </div>
          )}

          {profile.kaQuote && (
            <div className="mt-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">🧘‍♂️ Ka Quote</h2>
              <blockquote className="text-gray-600 italic border-l-4 pl-3 border-indigo-300 dark:text-zinc-300 dark:border-indigo-500">
                “{profile.kaQuote}”
              </blockquote>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">📣 Public Posts</h2>
            {shoutData.length > 0 ? (
              shoutData.map((post) => <PublicPost key={post.id} post={post} />)
            ) : (
              <p className="text-sm text-zinc-500 italic">No public posts yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SoulProfiles;
