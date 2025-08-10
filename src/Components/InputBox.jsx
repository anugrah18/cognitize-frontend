import { useState } from 'react';

export default function InputBox({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex px-6 py-4 border-t border-gray-200 bg-white">
      <textarea
        className="flex-1 resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button
        onClick={handleSend}
        className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 rounded-md transition"
      >
        Send
      </button>
    </div>
  );
}
