import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import UserMessage from "./UserMessage";
import BotMessageContainer from "./BotMessageContainer"; // bot messages aligned left
import botAvatar from "../assets/AiStein.png";
import { BACKEND_URL } from "../constants";
import ThinkingIndicator from "./ThinkingIndicator";

export default function ChatPane() {
  const messages = useSelector((state) => state.chat.messages);
  const userName = useSelector((state) => state.chat.userName);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const didAddWelcome = useRef(false);
  const [isThinking, setIsThinking] = useState(false);

  // Add welcome bot message if no messages exist yet and userName is set
  useEffect(() => {
    if (!didAddWelcome.current && userName) {
      dispatch(
        addMessage({
          id: Date.now(),
          text: `Hi ${userName}, how can I assist you today?`,
          type: "bot-standard",
          timestamp: new Date().toISOString(),
        })
      );
      didAddWelcome.current = true;
    }
  }, [userName, dispatch]);

  // Scroll to bottom on new messages or thinking change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  const handleSend = async (msg) => {
    dispatch(
      addMessage({
        id: Date.now(),
        text: msg,
        type: "user",
        timestamp: new Date().toISOString(),
      })
    );

    setIsThinking(true);

    try {
      const response = await fetch(`${BACKEND_URL}/ask?user_id=${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      // Example: Dispatch bot reply from backend data
      dispatch(
        addMessage({
          id: Date.now() + 1, // slightly different id
          text: data.answer || "Sorry, I couldn't find an answer.",
          type: data.tool_name? data.tool_name: "bot-default",
          timestamp: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error("Error fetching backend response:", error);
      dispatch(
        addMessage({
          id: Date.now() + 1,
          text: "Oops! Something went wrong.",
          type: "bot-standard",
          timestamp: new Date().toISOString(),
        })
      );
    } finally {
      setIsThinking(false);
    }
  };

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
          <div className="space-y-4 w-full flex flex-col">
            {messages.map(({ id, text, type }) =>
              type === "user" ? (
                <UserMessage key={id} text={text} />
              ) : (
                <BotMessageContainer key={id} text={text} type={type}/>
              )
            )}
            {/* Show "agent is thinking..." message while waiting */}
            {isThinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input box fixed at bottom */}
        <div className="border-t border-gray-300 w-full max-w-8xl">
          <InputBox onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
