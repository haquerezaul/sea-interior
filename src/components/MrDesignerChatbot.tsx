'use client'
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';

export default function MrDesignerChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I’m Mr. Designer. How can I help you today? 😊' },
  ]); //initial message
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'initial' | 'name' | 'phone' | 'location' | 'pincode' | 'done'>('initial');
  const userInfo = useRef({ name: '', phone: '', location: '', pincode: '' });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]); //new messages -> scroll to bottom

  const handleUserMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    if (step === 'initial') {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Can I get your name?' }]);
      setStep('name');
    } else if (step === 'name') {
      userInfo.current.name = userMessage;
      setMessages((prev) => [...prev, { sender: 'bot', text: `Thanks ${userMessage}, your phone number?` }]);
      setStep('phone');
    } else if (step === 'phone') {
      userInfo.current.phone = userMessage;
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Location please?' }]);
      setStep('location');
    } else if (step === 'location') {
      userInfo.current.location = userMessage;
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Last thing, your pincode?' }]);
      setStep('pincode');
    } else if (step === 'pincode') {
      userInfo.current.pincode = userMessage;
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Got it! You can now ask me anything about Sea Interior.' }]);
      setStep('done');

      await fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo.current),
      });
    } else {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.text }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleUserMessage();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col">
          <div className="bg-teal-600 text-white p-4 rounded-t-2xl flex items-center gap-2">
            <Bot className="w-5 h-5" /> <span className="font-semibold">Mr. Designer</span>
            <button className="ml-auto" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-3 text-sm space-y-2 bg-gray-50"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-3 py-2 rounded-xl ${
                  msg.sender === 'bot'
                    ? 'bg-teal-100 text-teal-800 self-start'
                    : 'bg-teal-600 text-white self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-teal-600 flex items-center gap-1">
                <Loader2 className="w-4 h-4 animate-spin" /> Typing...
              </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={handleUserMessage}
              className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          <Bot className="w-4 h-4" /> Chat with Mr. Designer
        </button>
      )}
    </div>
  );
}
