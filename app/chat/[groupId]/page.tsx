"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import ConnectionStatus from "@/components/ConnectionStatus";
import InputBox from "@/components/InputBox";
// import { url } from "@/utils/utils";

type Message = {
  type: "message" | "system";
  username?: string;
  text: string;
  timestamp: number;
};

export default function GroupChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const groupId = params.groupId as string;
  const username = searchParams.get("username") || "Anonymous";
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io(`https://echosphere-e3im.onrender.com`, {
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        groupId,
        username,
      },
    });

    // Connection event
    socketRef.current.on("connect", () => {
      setConnectionStatus("Connected");
      setError(null);
      console.log("Socket.IO connected");

      // Join the group after connection is established
      socketRef.current?.emit("joinGroup", { groupId, username });
    });

    // Handle incoming messages
    socketRef.current.on("newMessage", (message: Message) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Handle system messages (e.g., user join/leave)
    socketRef.current.on("systemMessage", (message: Message) => {
      console.log("System message received:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Handle errors
    socketRef.current.on("error", (errorMessage: string) => {
      setConnectionStatus("Connection failed");
      setError(errorMessage);
      console.error("Socket.IO error:", errorMessage);
    });

    // Handle disconnection
    socketRef.current.on("disconnect", () => {
      setConnectionStatus("Disconnected");
      setError("Connection closed. Please refresh the page to reconnect.");
      console.log("Socket.IO disconnected");
    });

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [groupId, username]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message
  const sendMessage = (text: string) => {
    if (text.trim() && socketRef.current?.connected) {
      console.log("Sending message:", text);
      socketRef.current.emit("sendMessage", { text });
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Group: {groupId}</h1>
          <ConnectionStatus status={connectionStatus} />
        </div>
        <p className="text-sm text-gray-600">Username: {username}</p>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto bg-white rounded-lg p-4 mb-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} username={username} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <InputBox
        onSend={sendMessage}
        disabled={connectionStatus !== "Connected"}
      />
    </div>
  );
}
