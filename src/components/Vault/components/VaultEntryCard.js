// src/components/Vault/components/VaultEntryCard.js
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaEye, FaRobot } from "react-icons/fa";
import { toast } from "react-toastify";

function VaultEntryCard({ entry }) {
  const cardRef = useRef(null);
  const [countdown, setCountdown] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const {
    id,
    emotion = "Truth",
    content = "",
    createdAt,
    unlockAt,
    savedBy = "Soulkeeper AI",
  } = entry;

  useEffect(() => {
    const opened = localStorage.getItem(`vault_opened_${id}`);
    setHasBeenOpened(!!opened);
  }, [id]);

  useEffect(() => {
    if (!unlockAt) return;

    const unlockTime = new Date(unlockAt).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = unlockTime - now;

      if (diff <= 0) {
        setCountdown("🔓 Unlocked");
        const toastShown = localStorage.getItem(`vault_toast_shown_${id}`);
        if (!toastShown && !hasBeenOpened) {
          const toastId = `vault-unlock-${id}`;
          localStorage.setItem(`vault_toast_shown_${id}`, "true");

          toast.info("🔓 A memory just whispered back to life…", {
            toastId,
            onClick: () => {
              cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              setIsOpen(true);
              localStorage.setItem(`vault_opened_${id}`, "true");
              setHasBeenOpened(true);
            },
          });
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown(`⏳ Unlocks in ${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [unlockAt, hasBeenOpened, id]);

  const isUnlocked = countdown === "🔓 Unlocked";

  const handleClick = () => {
    if (isUnlocked) {
      setIsOpen(!isOpen);
      localStorage.setItem(`vault_opened_${id}`, "true");
      setHasBeenOpened(true);
    }
  };

  const previewText =
    typeof content === "string" && content.trim() !== ""
      ? content.trim().split(/\s+/).slice(0, 5).join(" ") + "..."
      : "🔒 Locked Soul Entry";

  const moodIcon = {
    Light: <FaSun className="text-yellow-400" />,
    Shadow: <FaMoon className="text-gray-700" />,
    Truth: <FaEye className="text-indigo-500" />,
  }[emotion];

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Unknown time";

  const formattedUnlockAt = unlockAt
    ? new Date(unlockAt).toLocaleString()
    : "Unknown time";

  const glowClass =
    isUnlocked && !hasBeenOpened
      ? "shadow-[0_0_15px_rgba(147,51,234,0.5)] animate-pulse ring-2 ring-purple-400/60"
      : "shadow-md";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleClick}
      className={`cursor-pointer bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-xl p-4 space-y-2 transition-all duration-300 ${glowClass}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 dark:text-zinc-400 gap-1">
        <span className="flex items-center gap-2">
          {moodIcon} {emotion}
        </span>
        <span className="flex items-center gap-1">
          <FaRobot className="text-blue-400" /> {savedBy}
        </span>
      </div>

      {/* Content */}
      <div className="text-zinc-800 dark:text-zinc-200 text-md font-medium whitespace-pre-line">
        {isUnlocked && isOpen ? content : previewText}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-400 dark:text-gray-500 gap-1 pt-2">
        <div>🔒 Created: {formattedCreatedAt}</div>
        <div>{countdown || `🔓 Unlocks at: ${formattedUnlockAt}`}</div>
      </div>
    </motion.div>
  );
}

export default VaultEntryCard;
