"use client";
import { useState } from "react";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        🤖
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-4 bg-white p-4 rounded-xl shadow-xl w-80 h-96 z-50">
          <iframe src="/chatbot.html" className="w-full h-full rounded-lg" />
        </div>
      )}
    </>
  );
}
