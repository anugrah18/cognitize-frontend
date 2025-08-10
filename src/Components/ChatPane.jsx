import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useEffect, useRef } from "react";
import InputBox from "./InputBox";
import UserMessage from "./UserMessage";
import botAvatar from "../assets/AiStein.png";

export default function ChatPane() {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const handleSend = (msg) => {
    dispatch(addMessage({ id: Date.now(), text: msg }));
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex justify-center bg-slate-900 py-8">
      <main
        className="relative bg-white border border-gray-300 rounded-md shadow-md flex flex-col items-center"
        style={{ width: "80vw", height: "80vh" }}
      >
        {/* Bot Avatar centered at top */}
        <img
          src={botAvatar}
          alt="Bot Avatar"
          className="w-28 h-28 rounded-full mt-2 mb-0"
        />
        {/* Bot Name */}
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4 select-none">
          AI-stein
        </h2>

        <hr className="w-full border-t border-gray-300 mb-6" />

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 w-full max-w-8xl">
          {messages.length === 0 ? (
            <div className="text-gray-500 italic select-none text-center">
              Chat messages will appear here...
            </div>
          ) : (
            <div className="space-y-4 w-full flex flex-col">
              {messages.map(({ id, text }) => (
                <UserMessage key={id} text={text} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input box fixed at bottom */}
        <div className="border-t border-gray-300 w-full max-w-8xl">
          <InputBox onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
