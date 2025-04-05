import { useState } from "react";

type InputBoxProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function InputBox({ onSend, disabled }: InputBoxProps) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText("");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}
