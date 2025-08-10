import { useState, useEffect, useRef } from "react";
import InputBox from "./InputBox";
import UserMessage from "./UserMessage";

export default function ChatPane() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { id: Date.now(), text: msg }]);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex justify-center bg-slate-900 py-8">
      <main
        className="relative bg-white border border-gray-300 rounded-md shadow-md flex flex-col"
        style={{ width: "80vw", height: "75vh" }}
      >
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto pl-6 pr-0 py-6">
          {messages.length === 0 ? (
            <div className="text-gray-500 italic select-none text-center">
              Chat messages will appear here...
            </div>
          ) : (
            <div className="space-y-4 max-w-6xl mx-auto flex flex-col">
              {messages.map(({ id, text }) => (
                <UserMessage key={id} text={text} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input box fixed at bottom */}
        <div className="border-t border-gray-300">
          <InputBox onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
