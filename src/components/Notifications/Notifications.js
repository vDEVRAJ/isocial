// src/components/Notifications/Notifications.js

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { format } from "timeago.js";
import { FaCheckCircle, FaCommentDots } from "react-icons/fa";

function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(data);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const markAsRead = async (notifId) => {
    if (!user?.uid) return;
    const notifRef = doc(db, "users", user.uid, "notifications", notifId);
    await updateDoc(notifRef, { seen: true });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-6">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-zinc-400 italic text-sm">No new notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`border rounded-lg p-3 shadow-sm cursor-pointer transition ${
                notif.seen
                  ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                  : "bg-blue-100/80 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaCommentDots className="text-blue-600 dark:text-blue-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{notif.message}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {notif.timestamp?.toDate
                      ? format(notif.timestamp.toDate())
                      : "just now"}
                  </p>
                </div>
                {notif.seen && (
                  <FaCheckCircle className="text-green-500 text-sm" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
