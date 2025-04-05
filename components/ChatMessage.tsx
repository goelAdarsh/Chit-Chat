import { motion } from "framer-motion";

type Message = {
  type: "message" | "system";
  username?: string;
  text: string;
  timestamp: number;
};

type ChatMessageProps = {
  key: number;
  message: Message;
  username: string;
};

export default function ChatMessage({
  key,
  message,
  username,
}: ChatMessageProps) {
  console.log(key);
  return (
    <motion.div
      className={`mb-3 p-3 rounded-lg ${
        message.type === "system"
          ? "bg-yellow-100"
          : message.username === username
          ? "bg-blue-100 ml-auto"
          : "bg-gray-100"
      }`}
      style={{ maxWidth: "80%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.type === "message" && (
        <p className="font-semibold text-sm">{message.username}</p>
      )}
      <p className="text-gray-800">{message.text}</p>
      <p className="text-xs text-gray-500 mt-1">
        {new Date(message.timestamp).toLocaleTimeString()}
      </p>
    </motion.div>
  );
}
