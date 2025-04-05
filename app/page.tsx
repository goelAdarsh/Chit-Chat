"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <motion.div
        className="text-center p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Welcome to ChitChat!
        </motion.h1>

        <motion.p
          className="mt-4 text-lg font-medium text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A simple and secure way to connect with your friends.
        </motion.p>

        <motion.div
          className="mt-6 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-lg font-medium text-green-600">
            <strong>Features:</strong>
          </p>
          <ul className="text-green-600 mt-2">
            <li>💬 Seamless real-time messaging</li>
            <li>🔒 End-to-end encryption</li>
            <li>📱 Available on all devices</li>
            <li>👥 Create and manage groups</li>
          </ul>
        </motion.div>

        <motion.button
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <Link href="/Join">Get Started</Link>
        </motion.button>
      </motion.div>
    </div>
  );
}
