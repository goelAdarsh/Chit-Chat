"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [groupId, setGroupId] = useState("");
  const [username, setUsername] = useState("");
  const [hasCreatedGroup, setHasCreatedGroup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedGroupId = localStorage.getItem("userGroupId");
    if (storedGroupId && validateUUID(storedGroupId)) {
      setGroupId(storedGroupId);
      setHasCreatedGroup(true);
    }
  }, []);

  const handleJoin = () => {
    if (!validateUUID(groupId)) {
      setError("Please enter a valid group ID.");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    router.push(`/chat/${groupId}?username=${encodeURIComponent(username)}`);
  };

  const createNewGroup = () => {
    const newGroupId = uuidv4();
    setGroupId(newGroupId);
    localStorage.setItem("userGroupId", newGroupId);
    setHasCreatedGroup(true);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-2xl w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {hasCreatedGroup ? "Your Group" : "Join Group Chat"}
        </h1>

        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group ID"
                pattern="[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
                readOnly={hasCreatedGroup}
              />
              <button
                onClick={createNewGroup}
                className={`px-4 ${
                  hasCreatedGroup
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                } rounded-lg transition-colors`}
                disabled={hasCreatedGroup}
              >
                New
              </button>
            </div>
          </div>

          <button
            onClick={handleJoin}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {hasCreatedGroup ? "Join Your Group" : "Join Group"}
          </button>

          {hasCreatedGroup && (
            <button
              onClick={() => {
                localStorage.removeItem("userGroupId");
                setHasCreatedGroup(false);
                setGroupId("");
              }}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Leave Group
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
